'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  location: string;
  skills: string[];
  bio: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
        const res = await fetch(`/api/user?email=${session.user.email}`);
        const userData = await res.json();

        if (userData.success) {
          const normalizedUser: User = {
            ...userData.user,
            skills: typeof userData.user.skills === 'string'
              ? userData.user.skills.split(',').map((skill: string) => skill.trim())
              : userData.user.skills
          };

          setUser(normalizedUser);
          setTempUser(normalizedUser);
        }
      }
    };

    fetchUser();
  }, [session]);

  const handleSave = async () => {
    if (tempUser) {
      const res = await fetch(`/api/user/${tempUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempUser),
      });

      if (res.ok) {
        setUser(tempUser);
        setEditMode(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (tempUser) {
      setTempUser({
        ...tempUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <img src={user.image} alt="Profile" className="w-16 h-16 rounded-full" />
          {editMode ? (
            <input
              type="text"
              name="name"
              value={tempUser?.name || ''}
              onChange={handleChange}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            />
          ) : (
            <h2 className="text-xl font-semibold">{user.name}</h2>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Email</label>
          <p>{user.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Location</label>
          {editMode ? (
            <input
              type="text"
              name="location"
              value={tempUser?.location || ''}
              onChange={handleChange}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
            />
          ) : (
            <p>{user.location}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Skills</label>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(user.skills) ? user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-full text-sm"
              >
                {skill}
                {editMode && (
                  <button className="ml-1 text-gray-400 hover:text-red-400">×</button>
                )}
              </span>
            )) : <p>No skills listed</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Bio</label>
          {editMode ? (
            <textarea
              name="bio"
              value={tempUser?.bio || ''}
              onChange={handleChange}
              className="bg-gray-700 text-white px-3 py-2 rounded w-full"
              rows={3}
            />
          ) : (
            <p>{user.bio}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
