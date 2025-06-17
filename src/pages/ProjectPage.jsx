import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Slider } from "@/components/ui/slider";
import { Play, Save, Trash2, Volume2, Subtitles, Edit3 } from "lucide-react";
import { mockVoices, mockTemplates } from "@/lib/mockData";
import { toast } from "@/components/ui/use-toast";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, updateProject, deleteProject, generateVideo } = useProjects();
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [script, setScript] = useState("");
  const [volume, setVolume] = useState([75]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [isProcessingCaptions, setIsProcessingCaptions] = useState(false);

  useEffect(() => {
    const projectData = getProject(id);
    if (!projectData) {
      navigate("/dashboard");
      return;
    }
    setProject(projectData);
    setTitle(projectData.title);
    setDescription(projectData.description);
    setScript(projectData.script || "");
    setSelectedVoice(projectData.voice || "");
    setSelectedTemplate(projectData.template || "");
    setVolume([projectData.volume || 75]);
    setCaptions(projectData.captions || []);
  }, [id, getProject, navigate]);

  const handleGenerateCaptions = async () => {
    setIsProcessingCaptions(true);
    try {
      // Simulate caption generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockCaptions = [
        { start: 0, end: 3, text: "Welcome to our video presentation" },
        { start: 3, end: 6, text: "Today we'll be discussing key features" },
        { start: 6, end: 9, text: "Let's dive right in" }
      ];
      
      setCaptions(mockCaptions);
      updateProject(id, { captions: mockCaptions });
      
      toast({
        title: "Captions Generated",
        description: "Your captions have been generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Caption Generation Failed",
        description: "There was an error generating captions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingCaptions(false);
    }
  };

  const handleEditCaption = (index, newText) => {
    const updatedCaptions = [...captions];
    updatedCaptions[index] = { ...updatedCaptions[index], text: newText };
    setCaptions(updatedCaptions);
    updateProject(id, { captions: updatedCaptions });
  };

  // Rest of the existing code...

  return (
    <div className="container py-8">
      {/* Existing code... */}

      <div className="grid gap-8 md:grid-cols-2">
        {/* First column remains the same */}
        <div className="space-y-8">
          {/* Existing cards... */}
        </div>

        <div className="space-y-8">
          {/* Content card remains the same */}

          {/* New Captions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Subtitles className="mr-2 h-5 w-5" />
                Auto-Captions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                onClick={handleGenerateCaptions}
                disabled={isProcessingCaptions || project.status !== "completed"}
              >
                {isProcessingCaptions ? (
                  <>Processing Captions...</>
                ) : (
                  <>Generate Captions</>
                )}
              </Button>

              {captions.length > 0 && (
                <div className="space-y-4 mt-4">
                  <h3 className="font-semibold">Generated Captions</h3>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {captions.map((caption, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-muted rounded-md">
                        <span className="text-sm text-muted-foreground min-w-[60px]">
                          {Math.floor(caption.start)}s
                        </span>
                        <Textarea
                          value={caption.text}
                          onChange={(e) => handleEditCaption(index, e.target.value)}
                          className="min-h-[60px] flex-grow"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleEditCaption(index, caption.text)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generation card remains the same */}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;