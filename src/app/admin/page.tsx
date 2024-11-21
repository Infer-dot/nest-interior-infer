"use client";

import { useState, useEffect } from "react";
import Login from "@/components/admin/Login";

import ProjectsSection from "@/components/admin/Projects";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { account } from "@/lib/appwrite";
import { Loader2 } from "lucide-react";
const sections = [
  { id: "projects", name: "Projects" },
];


export default function AdminPanel() {
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated when the component mounts
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      await account.get();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("User is not authenticated:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const renderSection = () => {
    switch (selectedSection.id) {
      case "projects":
        return <ProjectsSection />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Sections */}
      <div className="w-64 border-r">
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">Sections</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={selectedSection.id === section.id ? "secondary" : "ghost"}
              className="w-full justify-start bg-black text-white hover:bg-black/60 font-semibold mx-2"
              onClick={() => setSelectedSection(section)}
            >
              {section.name}
            </Button>
          ))}
        </ScrollArea>
        <div className="p-4 ">
          <Button className="w-full bg-black/70 backdrop-blur-md hover:bg-black" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">{renderSection()}</div>
    </div>
  );
}
