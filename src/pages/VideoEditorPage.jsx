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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Play,
  Pause,
  Square,
  Scissors,
  Volume2,
  Save,
  Upload,
  Type,
  Image as ImageIcon,
  Music,
  Clock,
  Undo,
  Redo,
  Settings,
  Download,
  RotateCcw,
  RotateCw,
  Crop,
  Palette,
  Sparkles,
  Layers,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  Move,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize
} from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import { videoService } from "@/services/videoService";

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
  const [activeTab, setActiveTab] = useState("media");
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [textOverlays, setTextOverlays] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const waveformRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  // Effects library
  const effects = [
    { id: "fade", name: "Fade In/Out", icon: "🌅" },
    { id: "blur", name: "Blur", icon: "🌫️" },
    { id: "glitch", name: "Glitch", icon: "⚡" },
    { id: "vintage", name: "Vintage", icon: "📷" },
    { id: "neon", name: "Neon", icon: "💡" },
    { id: "matrix", name: "Matrix", icon: "🟢" },
    { id: "fire", name: "Fire", icon: "🔥" },
    { id: "water", name: "Water", icon: "💧" }
  ];

  // Filters library
  const filterPresets = [
    { id: "normal", name: "Normal", value: "none" },
    { id: "warm", name: "Warm", value: "sepia(0.3) hue-rotate(30deg)" },
    { id: "cool", name: "Cool", value: "hue-rotate(180deg) saturate(1.2)" },
    { id: "dramatic", name: "Dramatic", value: "contrast(1.3) brightness(0.8)" },
    { id: "vintage", name: "Vintage", value: "sepia(0.5) contrast(1.1)" },
    { id: "blackwhite", name: "Black & White", value: "grayscale(1)" },
    { id: "cinematic", name: "Cinematic", value: "contrast(1.2) saturate(0.8)" }
  ];

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
      visible: true,
      volume: 100,
      effects: [],
      filters: []
    }));

    setTracks([...tracks, ...newTracks]);
    addToUndoStack();
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
    const projectData = {
      tracks,
      textOverlays,
      audioTracks,
      filters,
      duration,
      timestamp: Date.now()
    };
    
    localStorage.setItem('videoProject', JSON.stringify(projectData));
    toast({
      title: "Project Saved",
      description: "Your project has been saved successfully.",
    });
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    try {
      // Simulate export process
      for (let i = 0; i <= 100; i += 10) {
        setExportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      toast({
        title: "Export Complete",
        description: "Your video has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const addTextOverlay = () => {
    const newText = {
      id: `text-${Date.now()}`,
      text: "New Text",
      position: { x: 50, y: 50 },
      fontSize: 24,
      color: "#ffffff",
      fontFamily: "Arial",
      startTime: currentTime,
      duration: 5,
      visible: true
    };
    setTextOverlays([...textOverlays, newText]);
  };

  const applyFilter = (filterType) => {
    if (selectedTrack) {
      const updatedTracks = tracks.map(track => 
        track.id === selectedTrack.id 
          ? { ...track, filters: [...track.filters, filterType] }
          : track
      );
      setTracks(updatedTracks);
      addToUndoStack();
    }
  };

  const toggleTrackVisibility = (trackId) => {
    const updatedTracks = tracks.map(track =>
      track.id === trackId ? { ...track, visible: !track.visible } : track
    );
    setTracks(updatedTracks);
    addToUndoStack();
  };

  const deleteTrack = (trackId) => {
    const updatedTracks = tracks.filter(track => track.id !== trackId);
    setTracks(updatedTracks);
    addToUndoStack();
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Back
          </Button>
          <h1 className="text-xl font-bold">Video Editor</h1>
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
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
      <div className="flex-1 flex">
        {/* Left Sidebar - Media Library & Effects */}
        <div className="w-80 border-r bg-card">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
            </TabsList>

            <TabsContent value="media" className="p-4">
              <div className="space-y-4">
                <div>
                  <Input
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
                </div>
                
                <div className="space-y-2">
                  {tracks.map((track) => (
                    <Card key={track.id} className={`cursor-pointer transition-colors ${
                      selectedTrack?.id === track.id ? 'ring-2 ring-primary' : ''
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleTrackVisibility(track.id)}
                            >
                              {track.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </Button>
                            <div>
                              <p className="font-medium text-sm truncate">{track.name}</p>
                              <p className="text-xs text-muted-foreground">{track.type}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTrack(track.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="effects" className="p-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Effects</h3>
                <div className="grid grid-cols-2 gap-2">
                  {effects.map((effect) => (
                    <Button
                      key={effect.id}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedEffect(effect)}
                      className="flex flex-col items-center p-2 h-auto"
                    >
                      <span className="text-lg mb-1">{effect.icon}</span>
                      <span className="text-xs">{effect.name}</span>
                    </Button>
                  ))}
                </div>

                <h3 className="font-semibold mt-6">Filters</h3>
                <div className="space-y-2">
                  {filterPresets.map((filter) => (
                    <Button
                      key={filter.id}
                      variant="outline"
                      size="sm"
                      onClick={() => applyFilter(filter.id)}
                      className="w-full justify-start"
                    >
                      {filter.name}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audio" className="p-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Audio Tracks</h3>
                <div className="space-y-2">
                  {audioTracks.map((audio) => (
                    <Card key={audio.id}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{audio.name}</p>
                            <p className="text-xs text-muted-foreground">Audio Track</p>
                          </div>
                          <Slider
                            value={[audio.volume]}
                            onValueChange={(value) => {
                              // Update audio volume
                            }}
                            max={100}
                            step={1}
                            className="w-24"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Center - Preview & Timeline */}
        <div className="flex-1 flex flex-col">
          {/* Preview Window */}
          <div className="flex-1 bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                ref={videoRef}
                className="max-w-full max-h-full"
                src={selectedTrack?.type === 'video' ? selectedTrack.url : undefined}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDuration(videoRef.current.duration);
                  }
                }}
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                  }
                }}
              />
            </div>
            
            {/* Preview Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/50 rounded-lg p-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>
              
              <div className="flex items-center space-x-2 text-white text-sm">
                <Clock className="h-4 w-4" />
                <span>
                  {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>
                  {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="h-64 bg-card border-t">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Scissors className="h-4 w-4 mr-2" />
                    Split
                  </Button>
                  <Button variant="outline" size="sm" onClick={addTextOverlay}>
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button variant="outline" size="sm">
                    <Music className="h-4 w-4 mr-2" />
                    Audio
                  </Button>
                  <Button variant="outline" size="sm">
                    <Crop className="h-4 w-4 mr-2" />
                    Crop
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Slider
                    value={zoom}
                    onValueChange={setZoom}
                    max={100}
                    step={1}
                    className="w-32"
                  />
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Timeline Tracks */}
              <div className="space-y-2">
                {tracks.map((track) => (
                  <div key={track.id} className="flex items-center space-x-2">
                    <div className="w-20 text-xs text-muted-foreground truncate">
                      {track.name}
                    </div>
                    <div
                      ref={timelineRef}
                      className="flex-1 h-12 bg-accent rounded-lg overflow-hidden relative cursor-pointer"
                      onClick={handleTimelineClick}
                    >
                      <div
                        className="absolute top-0 h-full w-0.5 bg-primary"
                        style={{ left: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Audio Waveform */}
              <div ref={waveformRef} className="mt-4 h-16" />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l bg-card">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Properties</h3>
            
            {selectedTrack && (
              <div className="space-y-4">
                <div>
                  <Label>Track Name</Label>
                  <Input value={selectedTrack.name} />
                </div>
                
                <div>
                  <Label>Volume</Label>
                  <Slider
                    value={[selectedTrack.volume]}
                    onValueChange={(value) => {
                      const updatedTracks = tracks.map(track =>
                        track.id === selectedTrack.id ? { ...track, volume: value[0] } : track
                      );
                      setTracks(updatedTracks);
                    }}
                    max={100}
                    step={1}
                  />
                </div>
                
                <div>
                  <Label>Start Time</Label>
                  <Input
                    type="number"
                    value={selectedTrack.start}
                    onChange={(e) => {
                      const updatedTracks = tracks.map(track =>
                        track.id === selectedTrack.id ? { ...track, start: parseFloat(e.target.value) } : track
                      );
                      setTracks(updatedTracks);
                    }}
                  />
                </div>
              </div>
            )}

            {selectedEffect && (
              <div className="space-y-4 mt-6">
                <h4 className="font-medium">{selectedEffect.name}</h4>
                <div>
                  <Label>Intensity</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <Button className="w-full">Apply Effect</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Progress */}
      {isExporting && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Exporting Video...</h3>
              <Progress value={exportProgress} className="mb-4" />
              <p className="text-sm text-muted-foreground">
                {exportProgress}% complete
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VideoEditorPage;