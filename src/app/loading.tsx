export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000028]  z-50">
      <div className="w-12 h-12 border-4 border-blue-600-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
