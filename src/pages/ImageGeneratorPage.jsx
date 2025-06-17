import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Image as ImageIcon, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ImageGeneratorPage = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState("1024x1024");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would be replaced with actual API call
      setGeneratedImage("https://source.unsplash.com/random");
      
      toast({
        title: "Success",
        description: "Image generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Image Generator</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prompt</label>
                <Textarea
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Style</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="artistic">Artistic</SelectItem>
                    <SelectItem value="cartoon">Cartoon</SelectItem>
                    <SelectItem value="anime">Anime</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="256x256">256x256</SelectItem>
                    <SelectItem value="512x512">512x512</SelectItem>
                    <SelectItem value="1024x1024">1024x1024</SelectItem>
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
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedImage ? (
                <div className="space-y-4">
                  <img
                    src={generatedImage}
                    alt="Generated image"
                    className="w-full rounded-lg"
                  />
                  <Button className="w-full" onClick={() => window.open(generatedImage)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </Button>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    Generated image will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneratorPage;