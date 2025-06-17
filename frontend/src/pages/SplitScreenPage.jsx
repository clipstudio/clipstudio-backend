import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Upload, Play, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SplitScreenPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userVideo, setUserVideo] = useState(null);
  const [processing, setProcessing] = useState(false);

  const templates = [
    {
      id: 1,
      title: "GTA V Parkour",
      duration: "0:30",
      thumbnail: "https://example.com/gta.jpg"
    },
    {
      id: 2,
      title: "Minecraft Parkour",
      duration: "0:30",
      thumbnail: "https://example.com/minecraft.jpg"
    },
    // Add more templates as needed
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setUserVideo(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid video file",
        variant: "destructive",
      });
    }
  };

  const handleCreate = async () => {
    if (!selectedTemplate || !userVideo) {
      toast({
        title: "Error",
        description: "Please select a template and upload your video",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Split screen video created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create split screen video",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Split Screen Game-play Creator</h1>

        <Tabs defaultValue="templates" className="space-y-8">
          <TabsList>
            <TabsTrigger value="templates">Choose Template</TabsTrigger>
            <TabsTrigger value="upload">Upload Your Video</TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedTemplate?.id === template.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent className="p-4">
                    <img 
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      alt={template.title}
                     src="https://images.unsplash.com/photo-1549500379-1938ee1fc6a8" />
                    <h3 className="font-semibold">{template.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Duration: {template.duration}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
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
                      MP4, MOV up to 500MB
                    </p>
                  </label>
                </div>

                {userVideo && (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <span>{userVideo.name}</span>
                    <Button
                      onClick={handleCreate}
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Create Split Screen"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SplitScreenPage;