"use client";

import React from "react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Vehicle Management System</h1>
      <p className="text-lg max-w-xl text-center">
        Welcome to the Vehicle Management System. Use the mobile app to manage vehicle usage and the web panel to manage drivers, photos, checklists, and app versions.
      </p>
      <div className="mt-8 text-center text-gray-400">
        <p>Use the navigation menu to access different features.</p>
      </div>
    </main>
  );
}
