function Loader({ size = 12, center = true, message = "Loading..." }) {
  const spinnerSize = `h-${size} w-${size}`;
  const containerClass = center
    ? "flex flex-col justify-center items-center h-40"
    : "inline-flex items-center gap-2";

  return (
    <div className={containerClass}>
      <div
        className={`${spinnerSize} animate-spin border-[3px] border-indigo-500 border-t-transparent rounded-full`}
      ></div>
      {message && (
        <p className="mt-2 text-sm text-gray-600 text-center">{message}</p>
      )}
    </div>
  );
}

export default Loader;
