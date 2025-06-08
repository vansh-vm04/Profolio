import React, { useState } from "react";
import Button from "../ui/Button";
import Progress from "../ui/Progress";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import isLoggedIn from "../../utils/authUtils";
import { CheckCircle, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const env = import.meta.env;

const DeployPage = () => {
  const [username, setUsername] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [deployedPath, setdeployedPath] = useState("")
  const resumeData = useSelector((state) => state.resume);
  const navigate = useNavigate();


  const isValidPathname = (path) => {
    const regex = /^[a-z0-9]+$/;
    const defaultPaths = ['login','signup','dashboard','heading','templates','preview','education','experience','skills','projects'];
    return regex.test(path) && !defaultPaths.includes(path);
  };

  const handleDeploy = async () => {
    if (!username) return toast.error("Please enter a path name");

    if (!isValidPathname(username)) {
      toast.info("Only lowercase letters and numbers allowed. Reserved words not allowed.");
      return;
    }

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

      if (res.status === 403) {
        toast.info("This URL is already taken. Try something unique.");
        setDeploying(false);
        return;
      }

      if (!res.ok) throw new Error("Deployment failed, Make sure to fill details of every section");

      let progressVal = 10;
      const interval = setInterval(() => {
        progressVal += 10;
        setProgress(progressVal);
        if (progressVal >= 100){
          clearInterval(interval)
          };
      }, 100);

      await res.json();
      setIsDone(true);
      setdeployedPath(username);
      // toast.success(`Deployed at ${env.VITE_BASE_URL}/${username}`);
    } catch (err) {
      toast.error("Deployment Failed, Make sure to fill details of every section");
      console.log(err);
    }finally{
      setDeploying(false);
    }
  };

  const handleCopy = () => {
    const fullUrl = `${env.VITE_BASE_URL}/${deployedPath}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="w-full md:ml-[216px] flex flex-col items-center justify-start p-6 space-y-6">
      {/* Back button */}
      <div className="w-full">
        <button
          onClick={() => navigate("/preview")}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 max-md:text-xl">🚀 Deploy Your Portfolio</h1>

      <div className="space-y-2 w-full flex flex-col max-w-[644px]">
        <label className="block text-sm font-medium text-gray-700">
          Set Live Link (Your public portfolio URL)
        </label>
        <div className="flex max-md:flex-col overflow-hidden rounded-md border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <span className="flex items-center px-3 bg-gray-100 text-gray-600 border-r border-gray-300">
            {env.VITE_BASE_URL}/
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none"
            placeholder="yourname"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={handleDeploy} disabled={deploying}>
          {deploying ? "Deploying..." : "Deploy"}
        </Button>
      </div>

      {deploying && (
        <div className="pt-4">
          <Progress value={progress} />
        </div>
      )}

      {isDone && (
        <div className="pt-8 animate-fadeIn flex flex-col gap-4">
          <div className="flex items-center gap-3 text-green-600">
            <CheckCircle className="w-7 h-7 animate-ping-once" />
            <span className="text-2xl font-semibold">Congratulations!!🎉 Deployed Successfully!</span>
          </div>

          <div className="flex items-center justify-between w-full p-4 bg-gray-100 border rounded-lg shadow-sm">
            <a
              href={`${env.VITE_BASE_URL}/${deployedPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium underline hover:text-blue-800 transition-all"
            >
              {env.VITE_BASE_URL}/{deployedPath}
            </a>
            <Button
              onClick={handleCopy}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 px-3 py-1"
            >
              <Copy className="w-5 h-5" />
              <span className="max-md:hidden">Copy Link</span>
            </Button>
          </div>
        </div>
      )}
      {isDone && (
        <div className="flex items-center flex-col gap-2">
          <span>You can view all deployed portfolios on your dashboard.</span>
          <button onClick={()=>navigate('/dashboard')} className="btn-save">Go To Dashboard</button>
        </div>
        
      )}
    </div>
  );
};

export default DeployPage;
