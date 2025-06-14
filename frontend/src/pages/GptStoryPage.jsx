import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const GptStoryPage = () => {
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("");
  const [tone, setTone] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState("");

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
    console.log('Generate button clicked');
    console.log('Current state:', { prompt, genre, tone });
    console.log('API URL:', API_URL);

    if (!prompt || !genre || !tone) {
      console.log('Validation failed:', { prompt, genre, tone });
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      console.log('Making API request to:', `${API_URL}/api/story/generate`);
      console.log('Request body:', {
        prompt,
        style: genre.toLowerCase(),
        length: "medium",
      });

      const response = await fetch(`${API_URL}/api/story/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          style: genre.toLowerCase(),
          length: "medium",
        }),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', errorText);
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      console.log('Response data:', data);
      setGeneratedStory(`${data.title}\n\n${data.content}\n\nTags: ${data.tags.join(', ')}`);
      
      toast({
        title: "Success",
        description: "Story generated successfully!",
      });
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate story",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">GPT Story Generator</h1>
        
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
                <div className="prose prose-sm">
                  <p className="whitespace-pre-wrap">{generatedStory}</p>
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