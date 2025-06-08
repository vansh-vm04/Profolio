import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 w-full">
      <div className="max-w-6xl mx-auto px-6 pb-10 space-y-8">
        {/* Divider */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <a
            href="/"
            className="hover:text-indigo-700 font-semibold transition-colors"
          >
            Profolio™
          </a>{" "}
          • All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
