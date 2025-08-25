import { useEffect, useState } from "react";
const env = import.meta.env;

function ServerWrapper(children) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const warmup = async () => {
      try {
        await fetch(`${env.VITE_SERVER_URL}/api/health`);
      } catch (e) {
        console.log("Server waking up...");
      } finally {
        setLoading(false);
      }
    };
    warmup();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold animate-pulse">🚀 Warming up server...</h1>
        <p className="mt-2 text-gray-400">This may take 10–20 seconds</p>
        <div className="mt-6 w-8 h-8 border-4 border-gray-500 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default ServerWrapper;