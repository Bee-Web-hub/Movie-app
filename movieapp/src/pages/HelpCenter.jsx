export default function HelpCenter({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#181818] p-6 rounded-md max-w-md w-full relative text-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Help Center</h2>
        <p className="text-gray-300 text-sm mb-4">
          Need assistance signing in? Try these steps:
        </p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
          <li>Check your internet connection.</li>
          <li>Make sure your email and password are correct.</li>
          <li>Reset your password if you’ve forgotten it.</li>
          <li>Still having trouble? Contact support at <span className="text-red-500">support@moviehub.com</span>.</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition py-2 rounded-md font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}