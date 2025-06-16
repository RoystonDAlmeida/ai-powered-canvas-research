import express from 'express';
import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNodeHttpEndpoint,
} from '@copilotkit/runtime';
import { GoogleGenerativeAI } from '@google/generative-ai';
 
const app = express();

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const serviceAdapter = new GoogleGenerativeAIAdapter({ 
  model: 'gemini-1.5-flash'
});
 
app.use('/api/copilotkit', (req, res, next) => {
  (async () => {
    const runtime = new CopilotRuntime();
    const handler = copilotRuntimeNodeHttpEndpoint({
      endpoint: '/api/copilotkit',
      runtime,
      serviceAdapter,
    });
 
    return handler(req, res);
  })().catch(next);
});