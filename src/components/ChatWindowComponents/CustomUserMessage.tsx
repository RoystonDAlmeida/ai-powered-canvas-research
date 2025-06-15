import { UserMessageProps } from "@copilotkit/react-ui";
 
const CustomUserMessage = (props: UserMessageProps) => {
  const wrapperStyles = "flex items-center gap-2 justify-end mb-4";
  const messageStyles = "bg-blue-700 text-white py-2 px-4 rounded-xl break-words flex-shrink-0 max-w-[80%]";
 
  return (
    <div className={wrapperStyles}>
      <div className={messageStyles}>{props.message}</div>
    </div>
  );
};
 
export default CustomUserMessage