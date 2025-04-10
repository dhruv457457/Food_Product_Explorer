function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent mb-4" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default Loader;
