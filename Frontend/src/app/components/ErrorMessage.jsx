function ErrorMessage({ message }) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Error</h3>
          <p>{message}</p>
        </div>
      </div>
    );
  }
  
  export default ErrorMessage;
  