import React from "react";

export const metadata = {
  title: "Vehicle Management System",
  description: "Web panel for vehicle management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
