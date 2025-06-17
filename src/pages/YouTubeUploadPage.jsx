import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Youtube } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const YouTubeUploadPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Video uploaded successfully!",
      });
      
      setUrl("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload video",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">YouTube Upload</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload from YouTube</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">YouTube Video URL</Label>
              <Input
                id="url"
                placeholder="https://youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Youtube className="mr-2 h-4 w-4" />
                  Upload Video
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YouTubeUploadPage;