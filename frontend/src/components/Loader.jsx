function Loader({ size = 10, center = true, message = '' }) {
    const spinnerSize = `h-${size} w-${size}`;
    const containerClass = center ? 'flex justify-center items-center h-40' : '';
  
    return (
      <div className={containerClass}>
        <div
          className={`${spinnerSize} animate-spin border-4 border-indigo-500 border-t-transparent rounded-full`}
        ></div>
        {message && (
          <p className="mt-2 text-sm text-gray-500 text-center w-full">{message}</p>
        )}
      </div>
    );
  }
  
  export default Loader;
  