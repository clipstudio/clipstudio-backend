import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Scissors, Upload, Play, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ContentClipperPage = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clips, setClips] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid video file",
        variant: "destructive",
      });
    }
  };

  const handleProcess = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a video file to process",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      // Simulate processing with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(i);
      }

      // Simulate generated clips
      const mockClips = [
        { id: 1, title: "Exciting Moment 1", duration: "0:30", thumbnail: "https://source.unsplash.com/random/1" },
        { id: 2, title: "Key Highlight 2", duration: "0:45", thumbnail: "https://source.unsplash.com/random/2" },
        { id: 3, title: "Viral Worthy 3", duration: "0:20", thumbnail: "https://source.unsplash.com/random/3" },
      ];

      setClips(mockClips);
      
      toast({
        title: "Success",
        description: "Video processed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process video",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Content Clipper</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-muted-foreground">
                  MP4, MOV up to 2GB
                </p>
              </label>
            </div>

            {file && (
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span>{file.name}</span>
                <Button
                  onClick={handleProcess}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Scissors className="mr-2 h-4 w-4" />
                      Process Video
                    </>
                  )}
                </Button>
              </div>
            )}

            {processing && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-center text-muted-foreground">
                  Analyzing video and generating clips...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {clips.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Clips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {clips.map((clip) => (
                  <div
                    key={clip.id}
                    className="flex items-center space-x-4 p-4 bg-muted rounded-lg"
                  >
                    <img
                      src={clip.thumbnail}
                      alt={clip.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{clip.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Duration: {clip.duration}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContentClipperPage;