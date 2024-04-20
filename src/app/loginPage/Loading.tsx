import '@/globals.css'

export default function Loading() {
  return (
    <div className="page">
      <div className="loading-container">
        <span className="loading loading-ball loading-md"></span>
        <div className="text">Loading your info...</div>
      </div>
    </div>
  );
}
