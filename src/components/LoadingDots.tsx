const LoadingDots = () => {
  // Return JSX
  return (
    <div className="loading-wrapper">
      <p className="loading-title">Loading</p>
      <div className="loading">
        <span className="loading-dot"></span>
        <span className="loading-dot"></span>
        <span className="loading-dot"></span>
      </div>
    </div>
  );
};
export default LoadingDots;
