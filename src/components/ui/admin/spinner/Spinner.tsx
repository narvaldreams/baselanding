export const Spinner = () => {
  return (
    <div className="flex items-start justify-center h-screen">
      <div
        className="w-10 h-10 border-4 border-black border-solid rounded-full border-t-transparent animate-spin"
        role="status"
        aria-label="Loading"
      >
      </div>
    </div>
  );
};