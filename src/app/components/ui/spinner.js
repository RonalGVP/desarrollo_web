export default function Spinner({ size, color }) {
  return (
    <div className={`animate-spin rounded-full ${size} border-4 ${color} border-t-transparent`}></div>
  );
}