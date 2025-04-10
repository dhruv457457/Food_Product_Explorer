function LoadMoreButton({ onClick, loading, disabled = false }) {
    return (
      <div className="mt-8 text-center">
        <button
          onClick={onClick}
          disabled={loading || disabled}
          className={`px-6 py-2 rounded font-semibold transition 
            ${loading || disabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    );
  }
  
  export default LoadMoreButton;
  