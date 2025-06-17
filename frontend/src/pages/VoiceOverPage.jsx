import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mic, Play, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import ttsService from "@/services/ttsService";

const VoiceOverPage = () => {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("alloy");
  const [model, setModel] = useState("tts-1");
  const [speed, setSpeed] = useState(1.0);
  const [generating, setGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const voices = [
    { id: "alloy", name: "Alloy - Balanced" },
    { id: "echo", name: "Echo - Clear" },
    { id: "fable", name: "Fable - Storytelling" },
    { id: "onyx", name: "Onyx - Deep" },
    { id: "nova", name: "Nova - Bright" },
    { id: "shimmer", name: "Shimmer - Warm" },
  ];

  const models = [
    { id: "tts-1", name: "TTS-1 (Standard)" },
    { id: "tts-1-hd", name: "TTS-1-HD (High Definition)" },
  ];

  const handleGenerate = async () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to convert to speech",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const data = await ttsService.generateSpeech({
        text,
        voice,
        model,
        speed,
      });
      
      setAudioUrl(data.url || data.audio_url);
      
      toast({
        title: "Success",
        description: "Voice over generated successfully!",
      });
    } catch (error) {
      console.error('Error generating voice over:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate voice over",
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Speed</label>
                <Select value={speed.toString()} onValueChange={(value) => setSpeed(parseFloat(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.25">0.25x (Slow)</SelectItem>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1.0">1.0x (Normal)</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2.0">2.0x (Fast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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