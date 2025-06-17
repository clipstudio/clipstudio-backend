import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import apiService from "@/services/api";
import {
  Play,
  Pause,
  Square,
  Scissors,
  Volume2,
  Save,
  Upload,
  Download,
  Type,
  Image as ImageIcon,
  Music,
  Clock,
  Undo,
  Redo,
  Wand2,
  Mic,
  Video,
  FileVideo,
  Youtube
} from "lucide-react";
import WaveSurfer from "wavesurfer.js";

const VideoEditorPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [zoom, setZoom] = useState([50]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  
  // AI Features
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiStyle, setAiStyle] = useState("realistic");
  const [generatedImages, setGeneratedImages] = useState([]);
  
  // TTS Features
  const [ttsText, setTtsText] = useState("");
  const [ttsVoice, setTtsVoice] = useState("alloy");
  const [ttsGenerating, setTtsGenerating] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  
  // Video Upload/Export
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [youtubeTitle, setYoutubeTitle] = useState("");
  const [youtubeDescription, setYoutubeDescription] = useState("");
  const [youtubeTags, setYoutubeTags] = useState("");

  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const waveformRef = useRef(null);
  const fileInputRef = useRef(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  useEffect(() => {
    // Initialize WaveSurfer for audio visualization
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4a5568',
        progressColor: '#2d3748',
        cursorColor: '#718096',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 60,
        normalize: true,
        partialRender: true,
      });

      return () => wavesurfer.destroy();
    }
  }, []);

  useEffect(() => {
    // Load available TTS voices
    loadTTSVoices();
  }, []);

  const loadTTSVoices = async () => {
    try {
      const voices = await apiService.get('/api/tts/voices');
      setAvailableVoices(voices);
    } catch (error) {
      console.error('Failed to load TTS voices:', error);
      // Use default voices if API fails
      setAvailableVoices([
        { id: "alloy", name: "Alloy", description: "A balanced, versatile voice" },
        { id: "echo", name: "Echo", description: "A warm, friendly voice" },
        { id: "fable", name: "Fable", description: "A clear, expressive voice" },
        { id: "onyx", name: "Onyx", description: "A deep, authoritative voice" },
        { id: "nova", name: "Nova", description: "A bright, energetic voice" },
        { id: "shimmer", name: "Shimmer", description: "A soft, gentle voice" }
      ]);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setTracks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleTimelineClick = (e) => {
    const timeline = timelineRef.current;
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newTracks = files.map((file, index) => ({
      id: `track-${Date.now()}-${index}`,
      type: file.type.startsWith('video') ? 'video' : 
            file.type.startsWith('audio') ? 'audio' : 'image',
      name: file.name,
      url: URL.createObjectURL(file),
      duration: 0,
      start: 0,
      file: file, // Keep reference to file for upload
    }));

    setTracks([...tracks, ...newTracks]);
    addToUndoStack();
  };

  const handleVideoUpload = async () => {
    if (!fileInputRef.current?.files?.length) {
      toast({
        title: "No file selected",
        description: "Please select a video file to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', youtubeTitle || file.name);
      formData.append('description', youtubeDescription);
      formData.append('tags', youtubeTags);

      const response = await apiService.post('/api/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: "Upload Successful",
        description: "Video uploaded successfully!",
      });

      // Add uploaded video to tracks
      const newTrack = {
        id: `track-${Date.now()}`,
        type: 'video',
        name: file.name,
        url: URL.createObjectURL(file),
        duration: 0,
        start: 0,
        uploaded: true,
        uploadData: response,
      };

      setTracks([...tracks, newTrack]);
      addToUndoStack();

    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload video",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleVideoDownload = async () => {
    if (tracks.length === 0) {
      toast({
        title: "No content",
        description: "Please add some content to export.",
        variant: "destructive",
      });
      return;
    }

    setExporting(true);
    try {
      // Create a simple video from tracks
      const videoData = {
        images: tracks.filter(t => t.type === 'image').map(t => t.url),
        audio_base64: null, // Would be generated from audio tracks
        duration: 10,
      };

      const response = await apiService.post('/api/video/generate', videoData);
      
      // Convert base64 to blob and download
      const videoBlob = new Blob([Buffer.from(response.video_base64, 'base64')], { type: 'video/mp4' });
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `video_${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Video exported and downloaded successfully!",
      });

    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export video",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const handleYouTubeUpload = async () => {
    if (!youtubeTitle.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for your YouTube video.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const response = await apiService.post('/api/video/youtube-upload', {
        video_path: tracks.find(t => t.uploaded)?.uploadData?.file_path,
        title: youtubeTitle,
        description: youtubeDescription,
        tags: youtubeTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      });

      toast({
        title: "YouTube Upload Successful",
        description: `Video uploaded to YouTube: ${response.youtube_url}`,
      });

    } catch (error) {
      console.error('YouTube upload failed:', error);
      toast({
        title: "YouTube Upload Failed",
        description: error.message || "Failed to upload to YouTube",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAIImageGeneration = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Missing prompt",
        description: "Please enter a prompt for image generation.",
        variant: "destructive",
      });
      return;
    }

    setAiGenerating(true);
    try {
      const response = await apiService.post('/api/image/generate', {
        prompt: aiPrompt,
        style: aiStyle,
        size: "1024x1024",
      });

      const newImage = {
        id: `ai-image-${Date.now()}`,
        url: response.url,
        prompt: aiPrompt,
        style: aiStyle,
      };

      setGeneratedImages([...generatedImages, newImage]);
      
      // Add to tracks
      const newTrack = {
        id: `track-${Date.now()}`,
        type: 'image',
        name: `AI Generated: ${aiPrompt}`,
        url: response.url,
        duration: 5,
        start: 0,
        aiGenerated: true,
      };

      setTracks([...tracks, newTrack]);
      addToUndoStack();

      toast({
        title: "Image Generated",
        description: "AI image generated successfully!",
      });

    } catch (error) {
      console.error('AI image generation failed:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate AI image",
        variant: "destructive",
      });
    } finally {
      setAiGenerating(false);
    }
  };

  const handleTTSGeneration = async () => {
    if (!ttsText.trim()) {
      toast({
        title: "Missing text",
        description: "Please enter text for TTS generation.",
        variant: "destructive",
      });
      return;
    }

    setTtsGenerating(true);
    try {
      const response = await apiService.post('/api/tts/generate', {
        text: ttsText,
        voice: ttsVoice,
        model: "tts-1",
      });

      // Convert base64 to audio URL
      const audioBlob = new Blob([Buffer.from(response.audio_base64, 'base64')], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Add to tracks
      const newTrack = {
        id: `track-${Date.now()}`,
        type: 'audio',
        name: `TTS: ${ttsText.substring(0, 30)}...`,
        url: audioUrl,
        duration: 0,
        start: 0,
        ttsGenerated: true,
        ttsData: response,
      };

      setTracks([...tracks, newTrack]);
      addToUndoStack();

      toast({
        title: "TTS Generated",
        description: "Text-to-speech audio generated successfully!",
      });

    } catch (error) {
      console.error('TTS generation failed:', error);
      toast({
        title: "TTS Failed",
        description: error.message || "Failed to generate TTS audio",
        variant: "destructive",
      });
    } finally {
      setTtsGenerating(false);
    }
  };

  const addToUndoStack = () => {
    setUndoStack([...undoStack, tracks]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, tracks]);
      setTracks(previousState);
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, tracks]);
      setTracks(nextState);
      setRedoStack(redoStack.slice(0, -1));
    }
  };

  const handleSave = () => {
    // Save project logic here
    toast({
      title: "Project Saved",
      description: "Your project has been saved successfully.",
    });
  };

  return (
    <div className="container py-4 min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Back
          </Button>
          <h1 className="text-2xl font-bold">AI Video Editor</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleUndo} disabled={undoStack.length === 0}>
            <Undo className="h-4 w-4 mr-2" />
            Undo
          </Button>
          <Button variant="outline" onClick={handleRedo} disabled={redoStack.length === 0}>
            <Redo className="h-4 w-4 mr-2" />
            Redo
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleVideoDownload} disabled={exporting}>
            {exporting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="grid grid-cols-12 gap-4 flex-grow">
        {/* Media Library */}
        <div className="col-span-3 bg-card rounded-lg p-4 border space-y-4">
          <h2 className="text-lg font-semibold">Media Library</h2>
          
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                ref={fileInputRef}
                type="file"
                multiple
                accept="video/*,audio/*,image/*"
                onChange={handleMediaUpload}
                className="hidden"
                id="media-upload"
              />
              <Label htmlFor="media-upload">
                <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Drop files here or click to upload</p>
                </div>
              </Label>
            </CardContent>
          </Card>

          {/* AI Image Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Wand2 className="h-4 w-4 mr-2" />
                AI Image Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                placeholder="Describe the image you want..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <Select value={aiStyle} onValueChange={setAiStyle}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                  <SelectItem value="cartoon">Cartoon</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleAIImageGeneration} 
                disabled={aiGenerating}
                className="w-full text-sm"
              >
                {aiGenerating ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* TTS Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Mic className="h-4 w-4 mr-2" />
                Text-to-Speech
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                placeholder="Enter text to convert to speech..."
                value={ttsText}
                onChange={(e) => setTtsText(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <Select value={ttsVoice} onValueChange={setTtsVoice}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleTTSGeneration} 
                disabled={ttsGenerating}
                className="w-full text-sm"
              >
                {ttsGenerating ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Generate TTS
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Images */}
          {generatedImages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Generated Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {generatedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                          const newTrack = {
                            id: `track-${Date.now()}`,
                            type: 'image',
                            name: `AI: ${image.prompt.substring(0, 20)}...`,
                            url: image.url,
                            duration: 5,
                            start: 0,
                            aiGenerated: true,
                          };
                          setTracks([...tracks, newTrack]);
                          addToUndoStack();
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                        <span className="text-white text-xs opacity-0 group-hover:opacity-100">Add to Timeline</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Video Preview */}
        <div className="col-span-6 bg-black rounded-lg p-4 flex items-center justify-center">
          <div className="text-center text-white">
            <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Video preview will appear here</p>
          </div>
        </div>

        {/* Timeline and Controls */}
        <div className="col-span-3 bg-card rounded-lg p-4 border space-y-4">
          <h2 className="text-lg font-semibold">Timeline</h2>
          
          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Pause className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Square className="h-4 w-4" />
            </Button>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0:00</span>
              <span>5:00</span>
            </div>
            <div 
              ref={timelineRef}
              className="h-2 bg-muted rounded cursor-pointer relative"
              onClick={handleTimelineClick}
            >
              <div className="h-full bg-primary rounded" style={{ width: '20%' }}></div>
            </div>
          </div>

          {/* Tracks */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Tracks</h3>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={tracks.map(t => t.id)} strategy={horizontalListSortingStrategy}>
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className="p-2 bg-muted rounded text-xs flex items-center space-x-2"
                  >
                    {track.type === 'video' && <Video className="h-3 w-3" />}
                    {track.type === 'audio' && <Music className="h-3 w-3" />}
                    {track.type === 'image' && <ImageIcon className="h-3 w-3" />}
                    <span className="truncate">{track.name}</span>
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          </div>

          {/* YouTube Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Youtube className="h-4 w-4 mr-2" />
                YouTube Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="Video title"
                value={youtubeTitle}
                onChange={(e) => setYoutubeTitle(e.target.value)}
                className="text-sm"
              />
              <Textarea
                placeholder="Video description"
                value={youtubeDescription}
                onChange={(e) => setYoutubeDescription(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <Input
                placeholder="Tags (comma separated)"
                value={youtubeTags}
                onChange={(e) => setYoutubeTags(e.target.value)}
                className="text-sm"
              />
              <Button 
                onClick={handleYouTubeUpload} 
                disabled={uploading}
                className="w-full text-sm"
              >
                {uploading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Youtube className="h-4 w-4 mr-2" />
                    Upload to YouTube
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoEditorPage;