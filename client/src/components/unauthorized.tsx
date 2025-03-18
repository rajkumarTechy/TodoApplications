import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-6xl font-bold text-red-600">401</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
          Unauthorized Access
        </h2>
        <p className="text-gray-500 mt-2">
          You don’t have permission to view this page.
        </p>
        <Link
          to="/home"
          className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
