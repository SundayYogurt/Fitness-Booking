import { useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-error">403</h1>
      <h2 className="text-2xl font-semibold mt-4">Access Denied</h2>
      <p className="text-base mt-2 text-base-content/70">
        You don’t have permission to access this page.
      </p>

      <div className="flex gap-4 mt-6">
        <button
          className="btn btn-neutral"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
        <button
          className="btn btn-outline"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
