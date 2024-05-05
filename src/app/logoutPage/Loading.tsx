import '@/globals.css'

export default function Loading() {
  return (
    <div className="page">
      <div className="loading-container">
        <div className="loading-wrapper">
          <span className="loading loading-spinner loading-lg"></span>
          <div className="text">Loading .. Please wait...</div>
        </div>
      </div>
    </div>
  );
}