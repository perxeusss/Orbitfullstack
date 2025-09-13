import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-[#030101] text-white pt-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">

        {/* Brand Info */}
        <div>
          <h1 className="text-2xl font-bold text-[#cc1212] mb-3">Orbit</h1>
          <p className="text-gray-400 text-sm">
            Your career, your trajectory. Explore top jobs, connect with recruiters, and land your dream job.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Popular Roles</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Frontend Developer</li>
            <li>Backend Developer</li>
            <li>Data Scientist</li>
            <li>UI/UX Designer</li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Stay Connected</h2>
          <div className="flex items-center space-x-4 text-[#cc1212] text-xl">
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            © {new Date().getFullYear()} Orbit. All rights reserved.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        Built with ❤️ by <span className="text-white font-medium">Orbit Team</span>
      </div>
    </footer>
  );
};
