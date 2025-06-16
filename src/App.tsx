import {
  CopilotChat,
  useCopilotChatSuggestions
} from '@copilotkit/react-ui';
import AppHeader from './components/AppHeader';
import CustomUserMessage from './components/ChatWindowComponents/CustomUserMessage';
import CustomAssistantMessage from './components/ChatWindowComponents/CustomAssistantMessage';
import CustomInput from './components/ChatWindowComponents/CustomInput';
import CustomSuggestionsList from './components/ChatWindowComponents/CustomSuggestionsList';
import "@copilotkit/react-ui/styles.css";

function App() {
  useCopilotChatSuggestions(
    {
      instructions: "Suggest three random topics to research on",
    }
  );

  return (
    <>
      <AppHeader/>
      <div className="w-96 fixed right-0 top-0 h-full z-50 bg-gray-50 shadow-lg p-4 border-l border-gray-300 overflow-y-auto flex flex-col">
        <CopilotChat
          labels={{
            title: "Research Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
          instructions={`You are a collaborative research assistant with multiple specialized agents:

            1. Research Agent: Conducts comprehensive research on topics
            2. Summarization Agent: Creates concise summaries and outlines
            3. Citation Agent: Manages references and citations

            Example suggestions:
            - Research the impact of artificial intelligence on healthcare
            - Create an outline for a paper on climate change solutions
            - Summarize recent developments in quantum computing
            - Find peer-reviewed sources about renewable energy
            - Help me structure my research on blockchain technology`}

          UserMessage={CustomUserMessage}
          AssistantMessage={CustomAssistantMessage}
          RenderSuggestionsList={CustomSuggestionsList}
          Input={CustomInput}
        />
      </div>
    </>
  );
}

export default App; 