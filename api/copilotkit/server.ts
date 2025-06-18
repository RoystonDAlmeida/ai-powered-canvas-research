import express from 'express';
import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNodeHttpEndpoint,
  LangGraphAgent
} from '@copilotkit/runtime';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { graph } from './src/workflow';
import cors from 'cors';

// Get current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Check for required environment variables
if (!process.env.GOOGLE_API_KEY) {
  console.error('GOOGLE_API_KEY is not set in environment variables');
  process.exit(1);
}
 
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const serviceAdapter = new GoogleGenerativeAIAdapter({ 
  model: 'gemini-1.5-flash'
});

// Create the CopilotRuntime instance
const runtime = new CopilotRuntime({
  agents: {
    "research_agent": new LangGraphAgent({
      deploymentUrl: process.env.LANGGRAPH_API_URL,
      graphId: 'research_agent'
    }),
  }
});

// Create the CopilotKit endpoint handler
const copilotHandler = copilotRuntimeNodeHttpEndpoint({
  endpoint: '/api/copilotkit',
  runtime,
  serviceAdapter,
});

// Use the handler for all CopilotKit routes
app.use('/api/copilotkit', copilotHandler);

// Create a handler for the LangGraph agent
app.post('/langgraph', async (req, res) => {
  try {
    console.log('Research agent called with:', req.body);
    
    const { messages, actions = [] } = req.body;
    
    // Prepare the input for LangGraph
    const input = {
      messages: messages,
      language: "english",
      copilotkit: {
        actions: actions
      }
    };
    
    // Call the LangGraph workflow
    const result = await graph.invoke(input);
    
    console.log('LangGraph agent result:', result);
    
    // Return the last message from the result
    const lastMessage = result.messages?.[result.messages.length - 1];
    
    if (lastMessage) {
      res.json({
        content: lastMessage.content,
        role: 'assistant'
      });
    } else {
      res.json({
        content: "I'm sorry, I couldn't process your request.",
        role: 'assistant'
      });
    }
  } catch (error) {
    console.error('Error in research agent:', error);
    return { content: "I'm sorry, there was an error processing your request." };
  }
});
 
app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
  console.log('LangGraph API endpoint: http://localhost:4000/api/copilotkit/langgraph');
  console.log('Research agent endpoint: http://localhost:4000/api/copilotkit/agents/research_agent');
});