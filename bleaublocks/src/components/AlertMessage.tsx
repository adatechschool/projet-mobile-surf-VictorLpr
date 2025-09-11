interface AlertMessageProps {
  type: 'success' | 'error';
  title: string;
  message: string;
}

export default function AlertMessage({ type, title, message }: AlertMessageProps) {
  const isSuccess = type === 'success';
  
  return (
    <div className={`${
      isSuccess 
        ? 'bg-green-500 bg-opacity-20 border border-green-500' 
        : 'bg-red-500 bg-opacity-20 border border-red-500'
    } rounded-lg p-4`}>
      <p className={`${
        isSuccess ? 'text-green-700' : 'text-red-700'
      } font-semibold`}>
        {isSuccess ? '✅' : '❌'} {title}
      </p>
      <p className={`${
        isSuccess ? 'text-green-600' : 'text-red-600'
      } text-sm`}>
        {message}
      </p>
    </div>
  );
}
