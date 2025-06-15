import React from 'react';
import { RenderSuggestion, RenderSuggestionsListProps, CopilotChatSuggestion } from "@copilotkit/react-ui";

const CustomSuggestionsList: React.FC<RenderSuggestionsListProps> = ({ suggestions, onSuggestionClick }) => {
  if (!suggestions || suggestions.length === 0) {
    return null; // Don't render if no suggestions
  }

  return (
    <div className="suggestions flex flex-col gap-2 p-4 border-t border-gray-200 mt-4">
      <h1 className="font-semibold text-gray-700 text-lg mb-2">You might also ask:</h1>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion: CopilotChatSuggestion, index) => (
          <RenderSuggestion
            key={index}
            title={suggestion.title}
            message={suggestion.message}
            partial={suggestion.partial}
            className="rounded-md border border-gray-500 bg-white px-3 py-1 text-sm shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => onSuggestionClick(suggestion.message)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomSuggestionsList; 