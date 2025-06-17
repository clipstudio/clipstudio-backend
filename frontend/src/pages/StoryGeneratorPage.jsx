import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import storyService from "@/services/storyService";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const storyStyles = [
  { value: "reddit", label: "Reddit Style" },
  { value: "creative", label: "Creative Writing" },
];

const StoryGeneratorPage = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("reddit");
  const [length, setLength] = useState("medium");
  const [generatedStory, setGeneratedStory] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!user?.subscription?.status === "active") {
      toast({
        title: "Subscription Required",
        description: "Please subscribe to use the story generator.",
        variant: "destructive",
      });
      return;
    }

    if (!prompt) {
      toast({
        title: "Missing Information",
        description: "Please provide a story prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const data = await storyService.generateStory({
        prompt,
        style,
        length,
      });
      
      setGeneratedStory(data);
      
      toast({
        title: "Story Generated",
        description: "Your story has been generated successfully!",
      });
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Story Generator</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Story Settings</CardTitle>
              <CardDescription>
                Configure your story parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Story Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Enter your story idea or prompt..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="style">Story Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {storyStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="length">Story Length</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Story
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Story</CardTitle>
              <CardDescription>
                Your AI-generated story will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedStory ? (
                <div className="prose prose-sm">
                  <h2 className="text-xl font-bold mb-4">{generatedStory.title}</h2>
                  <p className="whitespace-pre-wrap mb-4">{generatedStory.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {generatedStory.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No story generated yet. Configure your settings and click Generate!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoryGeneratorPage;