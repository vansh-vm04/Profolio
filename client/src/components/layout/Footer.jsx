import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white mt-1 shadow w-full">
      <div className="w-full px-4 max-w-screen mx-auto md:py-8">
        <div className="sm:flex max-w-screen-xl mx-auto sm:items-center sm:justify-between">
          <a
            href={`${import.meta.env.BASE_URL}`}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {/* <img src="/images/logo.svg" className="h-8" alt="Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-orange-1">
              ResumeDesk
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-black me-4 md:me-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-black me-4 md:me-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-black me-4 md:me-6"
              >
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-black">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center hover:text-black dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            ResumeDesk™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
