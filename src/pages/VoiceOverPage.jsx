import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mic, Play, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const VoiceOverPage = () => {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("");
  const [generating, setGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const voices = [
    { id: "male1", name: "James - Professional Male" },
    { id: "female1", name: "Sarah - Professional Female" },
    { id: "male2", name: "Mike - Casual Male" },
    { id: "female2", name: "Emma - Casual Female" },
    { id: "male3", name: "David - News Anchor" },
    { id: "female3", name: "Lisa - News Anchor" },
    { id: "male4", name: "Tom - Storyteller" },
    { id: "female4", name: "Anna - Storyteller" },
    { id: "male5", name: "John - Dynamic" },
    { id: "female5", name: "Maria - Dynamic" },
  ];

  const handleGenerate = async () => {
    if (!text || !voice) {
      toast({
        title: "Error",
        description: "Please enter text and select a voice",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock audio URL (in production, this would be the actual generated audio URL)
      setAudioUrl("https://example.com/audio.mp3");
      
      toast({
        title: "Success",
        description: "Voice over generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate voice over",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Voice Over Generator</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Voice Over</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Text to Convert</label>
              <Textarea
                placeholder="Enter the text you want to convert to speech..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Voice</label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
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
                  <Mic className="mr-2 h-4 w-4" />
                  Generate Voice Over
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {audioUrl && (
          <Card>
            <CardHeader>
              <CardTitle>Preview & Download</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              
              <Button className="w-full" onClick={() => window.open(audioUrl)}>
                <Download className="mr-2 h-4 w-4" />
                Download Audio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VoiceOverPage;