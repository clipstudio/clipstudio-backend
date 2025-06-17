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

const storyStyles = [
  { value: "adventure", label: "Adventure" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "scifi", label: "Science Fiction" },
  { value: "fantasy", label: "Fantasy" },
];

const StoryGeneratorPage = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [length, setLength] = useState("medium");
  const [generatedStory, setGeneratedStory] = useState("");
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

    if (!prompt || !style) {
      toast({
        title: "Missing Information",
        description: "Please provide a prompt and select a style.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call to GPT service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockStory = `Once upon a time in a ${style} world, ${prompt}. 
      [This is a mock story generation. In production, this would connect to an actual GPT service.]
      The story continues with exciting twists and turns, keeping readers engaged until the very end.
      Characters develop, plot thickens, and the ${style} elements create a unique atmosphere.`;
      
      setGeneratedStory(mockStory);
      
      toast({
        title: "Story Generated",
        description: "Your story has been generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate story. Please try again.",
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
                  <p className="whitespace-pre-wrap">{generatedStory}</p>
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