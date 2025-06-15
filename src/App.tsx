import { CopilotKit } from '@copilotkit/react-core';
import {
  CopilotChat
} from '@copilotkit/react-ui';
import AppHeader from './components/AppHeader';
import CustomUserMessage from './components/ChatWindowComponents/CustomUserMessage';
import CustomAssistantMessage from './components/ChatWindowComponents/CustomAssistantMessage';
import CustomInput from './components/ChatWindowComponents/CustomInput';
import CustomSuggestionsList from './components/ChatWindowComponents/CustomSuggestionsList';
import "@copilotkit/react-ui/styles.css";

function App() {
  return (
    <CopilotKit publicApiKey={import.meta.env.VITE_COPILOT_API_KEY}>
      <AppHeader description="Your Intelligent Research Companion"/>
      <div className="w-96 fixed right-0 top-0 h-full z-50 bg-gray-50 shadow-lg p-4 border-l border-gray-300 overflow-y-auto flex flex-col">
        <CopilotChat
          labels={{
            title: "Research Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
          UserMessage = {CustomUserMessage}
          AssistantMessage = {CustomAssistantMessage}
          RenderSuggestionsList={CustomSuggestionsList}
          Input={CustomInput}
        />
      </div>
    </CopilotKit>
  );
}

export default App; 