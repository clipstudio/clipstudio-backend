import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, Copy, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { storyService } from "@/services/storyService";

const GptStoryPage = () => {
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("");
  const [tone, setTone] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState(null);

  const genres = [
    "Drama",
    "Comedy",
    "Romance",
    "Mystery",
    "Horror",
    "Adventure",
    "Sci-Fi",
    "Fantasy"
  ];

  const tones = [
    "Funny",
    "Serious",
    "Mysterious",
    "Emotional",
    "Inspirational",
    "Dramatic",
    "Casual",
    "Professional"
  ];

  const handleGenerate = async () => {
    if (!prompt || !genre || !tone) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      // Try to use the real API first
      const story = await storyService.generateStory(prompt, genre, tone);
      setGeneratedStory(story);
      
      toast({
        title: "Success",
        description: "Story generated successfully!",
      });
    } catch (error) {
      console.log("API failed, using mock data:", error);
      
      // Fallback to mock data if API fails
      try {
        const mockStory = await storyService.generateMockStory(prompt, genre, tone);
        setGeneratedStory(mockStory);
        
        toast({
          title: "Mock Story Generated",
          description: "Using mock data (API unavailable). Story generated successfully!",
        });
      } catch (mockError) {
        toast({
          title: "Error",
          description: "Failed to generate story. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyStory = () => {
    if (generatedStory) {
      const storyText = `${generatedStory.title}\n\n${generatedStory.content}`;
      navigator.clipboard.writeText(storyText);
      toast({
        title: "Copied!",
        description: "Story copied to clipboard",
      });
    }
  };

  const handleDownloadStory = () => {
    if (generatedStory) {
      const storyText = `${generatedStory.title}\n\n${generatedStory.content}\n\nTags: ${generatedStory.tags.join(', ')}`;
      const blob = new Blob([storyText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedStory.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded!",
        description: "Story saved to your device",
      });
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Story Prompt</label>
                <Textarea
                  placeholder="Describe your story idea..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Genre</label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
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
            </CardHeader>
            <CardContent>
              {generatedStory ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{generatedStory.title}</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyStory}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadStory}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{generatedStory.content}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    {generatedStory.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Your generated story will appear here
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GptStoryPage;