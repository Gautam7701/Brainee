"use client"
import React, { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        darkMode ? 'bg-[#111111] text-white' : 'bg-white text-[#111111]'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Settings</h1>

        {/* Profile Settings */}
        <div
          className={`rounded-lg p-6 mb-8 shadow-md ${
            darkMode ? 'bg-[#191919]' : 'bg-gray-100'
          }`}
        >
          <h2 className="text-xl font-medium mb-4">Profile</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full px-4 py-2 rounded border ${
                darkMode
                  ? 'bg-[#27292d] border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-[#111111]'
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-2 rounded border ${
                darkMode
                  ? 'bg-[#27292d] border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-[#111111]'
              }`}
            />
            <button
              className={`px-4 py-2 rounded ${
                darkMode
                  ? 'bg-[#2563eb] text-[#111111]'
                  : 'bg-[#2563eb] text-white hover:bg-[#27292d]'
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div
          className={`rounded-lg p-6 mb-8 shadow-md ${
            darkMode ? 'bg-[#191919]' : 'bg-gray-100'
          }`}
        >
          <h2 className="text-xl font-medium mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="darkModeToggle">Dark Mode</label>
              <input
                id="darkModeToggle"
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="notifications">Enable Notifications</label>
              <input type="checkbox" id="notifications" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className={`rounded-lg p-6 shadow-md ${
            darkMode ? 'bg-red-900 text-white' : 'bg-red-100 text-red-700'
          }`}
        >
          <h2 className="text-xl font-medium mb-4">Danger Zone</h2>
          <button
            className={`px-4 py-2 rounded ${
              darkMode
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
