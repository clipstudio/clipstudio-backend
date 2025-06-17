import React from "react";
import { Button } from "@/components/ui/button";

const RedditStoryPage = () => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6">Fake Reddit Story Generator</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Create engaging Reddit-style posts and comment threads that look just like the real thing.
        Perfect for storytelling content on social media.
      </p>
      
      {/* Placeholder for the actual Reddit story generator UI */}
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
        <p className="text-muted-foreground mb-4">
          We're working hard to bring you the best Reddit story creation experience.
          Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default RedditStoryPage;