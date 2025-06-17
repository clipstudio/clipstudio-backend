import React from "react";
import { Button } from "@/components/ui/button";

const TextStoryPage = () => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6">Fake Text Story Generator</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Create realistic-looking text message conversations with timestamps, emojis, and typing indicators.
        Perfect for TikTok and Instagram Reels content.
      </p>
      
      {/* Placeholder for the actual text story generator UI */}
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
        <p className="text-muted-foreground mb-4">
          We're working hard to bring you the best text story creation experience.
          Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default TextStoryPage;