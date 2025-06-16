import { InputProps } from "@copilotkit/react-ui";

function CustomInput({ inProgress, onSend }: InputProps) {
  const handleSubmit = (value: string) => {
    if (value.trim()) onSend(value);
  };
 
  const wrapperStyle = "flex gap-2 p-4 border-t";
  const inputStyle = "flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100";
  const buttonStyle = "px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed";
 
  return (
    <div className={wrapperStyle}>
      <input 
        disabled={inProgress}
        type="text" 
        placeholder="Ask your question here..." 
        className={inputStyle}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
      <button 
        disabled={inProgress}
        className={buttonStyle}
        onClick={(e) => {
          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
          handleSubmit(input.value);
          input.value = '';
        }}
      >
        Ask
      </button>
    </div>
  );
}

export default CustomInput;