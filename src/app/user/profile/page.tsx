// src/app/user/profile/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  avatar: string;
  bio: string;
  skills: string[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Failed to fetch user data');
        const userData = await response.json();
        if (userData.success) {
          setUser(userData.user);
          setTempUser(userData.user);
        } else {
          alert(userData.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempUser(prev => prev ? { ...prev, [name]: value } : null);
  };

const handleSave = async () => {
  if (tempUser) {
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: tempUser.name,
          email: tempUser.email,
          role: tempUser.role,
          department: tempUser.department,
          bio: tempUser.bio,
          skills: tempUser.skills.join(','),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const result = await response.json();
      if (result.success) {
        setUser(tempUser);
        setEditMode(false);
        alert('Profile updated successfully');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data');
    }
  }
};
  const handleLogout = () => {
    document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  if (!user || !tempUser) {
    return (
      <div className="relative min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Floating orbs background */}
      <div className="fixed w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl -left-40 -top-40 animate-float"></div>
      <div className="fixed w-96 h-96 rounded-full bg-purple-500 opacity-10 blur-3xl -right-60 bottom-20 animate-float animation-delay-2000"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/user" 
            className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            USER PROFILE
          </h1>
          
          <button 
            onClick={handleLogout}
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Profile card */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                  <Image
                    src={user.avatar || '/default-avatar.png'}
                    alt="Avatar"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                {editMode && (
                  <button className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full border border-cyan-400 hover:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
              
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={tempUser.name}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white text-center px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xl font-semibold mb-1 w-full"
                />
              ) : (
                <h2 className="text-xl font-semibold text-white text-center">{user.name}</h2>
              )}
              
              {editMode ? (
                <input
                  type="text"
                  name="role"
                  value={tempUser.role}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-gray-400 text-center px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 mt-1 w-full"
                />
              ) : (
                <p className="text-gray-400 text-center">{user.role}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={tempUser.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="text-white">{user.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Department</label>
                {editMode ? (
                  <input
                    type="text"
                    name="department"
                    value={tempUser.department}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="text-white">{user.department}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Member Since</label>
                <p className="text-white">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-8">
              {editMode ? (
                <div className="flex space-x-3">
                  <button 
                    onClick={handleSave}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setEditMode(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg border border-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setEditMode(true)}
                  className="w-full bg-transparent hover:bg-cyan-900 text-cyan-400 py-2 rounded-lg border border-cyan-400 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Middle column - Bio and Skills */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-4">BIO</h3>
            
            {editMode ? (
              <textarea
                name="bio"
                value={tempUser.bio}
                onChange={handleInputChange}
                rows={5}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            ) : (
              <p className="text-gray-300 whitespace-pre-line">{user.bio}</p>
            )}
            
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">SKILLS</h3>
            
            <div className="flex flex-wrap gap-2">
				{Array.isArray(user.skills) ? user.skills.map((skill, index) => (
				  <span key={index} className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-full text-sm">
					{skill}
					{editMode && (
					  <button className="ml-1 text-gray-400 hover:text-red-400">
						×
					  </button>
					)}
				  </span>
				)) : null}
              
              {editMode && (
                <button className="px-3 py-1 bg-gray-700 text-gray-400 hover:text-cyan-400 rounded-full text-sm border border-dashed border-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Skill
                </button>
              )}
            </div>
          </div>

          {/* Right column - Account Settings */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm bg-opacity-50 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">ACCOUNT SETTINGS</h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">Password</h4>
                <p className="text-gray-400 text-sm mb-3">Last changed 3 months ago</p>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center">
                  Change Password
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-3">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Currently disabled</span>
                  <button className="text-cyan-400 hover:text-cyan-300 text-sm">
                    Enable 2FA
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-3">Notification Preferences</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-cyan-500 rounded" defaultChecked />
                    <span className="text-gray-300">Email notifications</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-cyan-500 rounded" defaultChecked />
                    <span className="text-gray-300">Audit reminders</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-cyan-500 rounded" />
                    <span className="text-gray-300">Mobile push notifications</span>
                  </label>
                </div>
              </div>
              
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-900/50">
                <h4 className="text-lg font-medium text-white mb-2">Danger Zone</h4>
                <p className="text-gray-400 text-sm mb-3">Permanent actions that cannot be undone</p>
                <button className="text-red-400 hover:text-red-300 text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}