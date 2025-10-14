import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900 text-center transition-colors duration-300">
      <h1 className="text-6xl font-bold text-[#009CFE] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 font-semibold rounded text-white transition duration-300"
        style={{ backgroundColor: "#009CFE" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#005DB5")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#009CFE")
        }
      >
        Go Back Home
      </Link>
      <div className="mt-12">
        <img
          src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
          alt="404 illustration"
          className="w-64 mx-auto opacity-50"
        />
      </div>
    </div>
  );
};

export default NotFound;
