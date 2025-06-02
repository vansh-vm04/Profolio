import React, { useState } from "react";
import Button from "../ui/Button";
import Progress from "../ui/Progress";
import { toast } from "react-toastify";
const env = import.meta.env;
import { useSelector } from 'react-redux';
import isLoggedIn from "../../utils/authUtils";
import { CheckCircle } from "lucide-react";

const DeployPage = () => {
  const [username, setUsername] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const resumeData = useSelector((state) => state.resume);

  const handleDeploy = async () => {
    if (!username) return toast.error("Please enter a username");

    setIsDone(false);
    setDeploying(true);
    setProgress(10);

    try {
      const user = await isLoggedIn();
      resumeData.hash = username;

      const res = await fetch(`${env.VITE_SERVER_URL}/api/portfolio/save/${user.data.username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      });
      if(res.status==403) toast.info("This Url is already taken, Enter something unique")
      if (!res.ok) throw new Error("Deployment failed");

      let progressVal = 10;
      const interval = setInterval(() => {
        progressVal += 10;
        setProgress(progressVal);
        if (progressVal >= 100) clearInterval(interval);
      }, 200);

      await res.json(); // Wait for server
      toast.success(`Deployed at ${env.VITE_BASE_URL}/${username}`);
      setIsDone(true);
    } catch (err) {
      toast.error("Deployment Failed");
      console.log(err);
    } finally {
      setDeploying(false);
      setProgress(100);
    }
  };

  const handleDownload = () => {
    window.open(`/api/download-pdf?username=${username}`, "_blank");
  };

  const handleCopy = () => {
    const fullUrl = `${env.VITE_BASE_URL}/${username}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="w-full md:ml-[216px] mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Deploy & Download Portfolio</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Set Live Link (This can be used to access your portfolio site)
        </label>
        <div className="flex max-w-[644px] rounded-sm border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
          <span className="flex items-center px-3 text-gray-500 bg-gray-100 border-r border-gray-300">
            {env.VITE_BASE_URL}/
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 px-3 py-2 focus:outline-none"
            placeholder="yourname"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={handleDeploy} disabled={deploying}>
          {deploying ? "Deploying..." : "Deploy"}
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          Download as PDF
        </Button>
      </div>

      {deploying && (
        <div className="pt-4">
          <Progress value={progress} />
        </div>
      )}

      {isDone && (
        <div className="pt-6 flex flex-col items-start gap-3">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-medium">Deployed Successfully!</span>
          </div>
          <div className="flex items-center gap-3 text-blue-600 underline">
            <a
              href={`${env.VITE_BASE_URL}/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              {env.VITE_BASE_URL}/{username}
            </a>
            <Button onClick={handleCopy} size="sm" variant="secondary">
              Copy Link
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeployPage;
