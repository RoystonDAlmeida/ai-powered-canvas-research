import { AssistantMessageProps } from "@copilotkit/react-ui";
import { useChatContext } from "@copilotkit/react-ui";
import { Markdown } from "@copilotkit/react-ui";
import { SparklesIcon } from "@heroicons/react/24/outline";

const CustomAssistantMessage = (props: AssistantMessageProps) => {
    const { icons } = useChatContext();
    const { message, isLoading, subComponent } = props;
   
    const avatarStyles = "bg-zinc-400 border-zinc-500 shadow-lg min-h-10 min-w-10 rounded-full text-white flex items-center justify-center";
    const messageStyles = "px-4 rounded-xl pt-2";
   
    const avatar = <div className={avatarStyles}><SparklesIcon className="h-6 w-6" /></div>
   
    return (
      <div className="py-2">
        <div className="flex items-start">
          {!subComponent && avatar}
          <div className={messageStyles}>
            {message && <Markdown content={message || ""} /> }
            {isLoading && icons.spinnerIcon}
          </div>
        </div>
        <div className="my-2">{subComponent}</div>
      </div>
    );
};

export default CustomAssistantMessage;