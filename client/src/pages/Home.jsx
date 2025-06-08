import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetResume } from "../features/resume/resumeSlice";
import isLoggedIn from "../utils/authUtils";
import { setUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
const env = import.meta.env;

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedIn, setloggedIn] = useState(false);
  const heroImages = [
    "/images/nightprofile.png",
    "/images/blushtone.png",
    "/images/cyberglow.png",
    "/images/lavenderrise.png",
    "/images/neonmatrix.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);
    const checkUser = async () => {
      const user = await isLoggedIn();
      if (user.loggedIn) {
        setloggedIn(true);
        dispatch(setUser(user.data));
      }
    };
    checkUser();
    return () => clearInterval(interval);
  }, [dispatch]);

  const buildResume = () => {
    if (loggedIn) {
      dispatch(resetResume());
      navigate("/heading");
    } else {
      toast.info("Please Login First");
      navigate("/login");
    }
  };
  const profolio = ["P", "r", "o", "f", "o", "l", "i", "o", "!"];

  return (
    <div
      id="landing"
      className="w-full bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 text-gray-900 font-sans"
    >
      {/* Hero Section */}
      <section className="min-h-screen px-6 pt-32 text-center flex flex-col items-center justify-center space-y-8 animate-fade-in">
        <h1 className="text-6xl font-extrabold leading-tight max-w-4xl drop-shadow-xl">
          Craft Modern Portfolios with{" "}
          <span className="text-indigo-700 items-center justify-center flex flex-nowrap">
            {profolio.map((letter, idx) => {
              return (
                <span key={idx} className="cursor-grabbing animate_rubberband">
                  {letter}
                </span>
              );
            })}
          </span>
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl">
          Build and host modern and responsive portfolios in minutes. Let your
          skills shine effortlessly.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={buildResume}
            className="px-6 py-3 bg-indigo-700 text-white rounded-full font-semibold hover:bg-indigo-800 transition duration-300 shadow-lg"
          >
            Get Started Free
          </button>
          <a
            href="#features"
            className="px-6 py-3 border border-indigo-700 text-indigo-700 rounded-full font-semibold hover:bg-indigo-100 transition duration-300 shadow"
          >
            Explore Features
          </a>
        </div>
        <div className="relative mt-12 max-w-5xl w-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-shadow duration-700 hover:shadow-[0_30px_80px_rgba(99,102,241,0.2)]">
          <img
            src={heroImages[currentImageIndex]}
            alt="Portfolio Preview"
            className="object-cover object-top w-full md:h-[644px] rounded-3xl scale-100 transition-transform duration-700 ease-in-out hover:scale-105 animate-fade-slide"
          />
        </div>
      </section>

      {/* Feature Section */}
      <section
        id="features"
        className="min-h-screen py-24 px-6 text-center animate-fade-in-up"
      >
        <h2 className="text-4xl font-bold mb-12 text-indigo-700">
          Why You{`'`}ll Love Profolio
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-pink-500">
              Elegant Templates
            </h3>
            <p className="text-gray-700">
              Choose from beautifully designed templates that adapt to every
              device.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
              Live Preview
            </h3>
            <p className="text-gray-700">
              Build and preview in real-time. No code required.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-green-500">
              Project Links
            </h3>
            <p className="text-gray-700">
              Showcase your live projects by attaching direct links to each
              project. Visitors can click to view demos, GitHub repos, or
              hosted versions.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">
              Responsive Design
            </h3>
            <p className="text-gray-700">
              Your portfolio looks great on every screen from phones to
              desktops.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-rose-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-rose-500">
              Fast Hosting
            </h3>
            <p className="text-gray-700">
              Your portfolio is hosted on fast and reliable servers with instant
              publishing.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-purple-500">
              Download as PDF
            </h3>
            <p className="text-gray-700">
              Instantly download your portfolio as a polished PDF for offline
              sharing.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-teal-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-teal-500">
              Lightning Performance
            </h3>
            <p className="text-gray-700">
              Optimized for speed, your portfolio loads instantly for every
              visitor.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-orange-500">
              Custom Domains
            </h3>
            <p className="text-gray-700">
              Publish your portfolio on a personalized domain to stand out and
              build your identity.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-fuchsia-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-fuchsia-500">
              Shareable Links
            </h3>
            <p className="text-gray-700">
              Anyone can access your portfolio using your simple custom url.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-indigo-100 px-6 md:px-12 py-24 flex flex-col items-center text-center space-y-16 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-indigo-700 drop-shadow-sm">
            🚀 Real-time Portfolio Hosting with Custom URLs
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Host your portfolio at{" "}
            <code className="bg-indigo-100 px-3 py-1.5 rounded-md font-mono text-indigo-700 shadow-sm">
              {env.VITE_BASE_URL}/yourname
            </code>{" "}
            and share it instantly. Let the world see your work beautifully.
          </p>
        </div>

        {/* Video Wrapper with animations */}
        <div className="relative rounded-xl overflow-hidden max-w-4xl w-full border border-indigo-200 shadow-2xl transform transition-all duration-700 hover:scale-105 group">
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/video/demo2.mp4"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-in-out rounded-xl"
          />
          {/* Optional decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/30 to-transparent pointer-events-none rounded-xl" />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-indigo-800 px-6 py-24 text-center flex flex-col items-center text-white animate-fade-in-up">
        <h2 className="text-5xl font-bold max-w-2xl mb-6">
          Your Portfolio. Your Identity. Powered by Profolio.
        </h2>
        <button
          onClick={buildResume}
          className="mt-4 px-10 py-4 bg-white text-indigo-800 font-semibold text-lg rounded-full hover:bg-indigo-100 transition duration-300 shadow-lg"
        >
          Start Building Now
        </button>
      </section>
    </div>
  );
};

export default Home;
