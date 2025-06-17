import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
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
  Redo
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

  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const waveformRef = useRef(null);

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
    // Save project logic here
    toast({
      title: "Project Saved",
      description: "Your project has been saved successfully.",
    });
  };

  const handleExport = () => {
    // Export logic here
    toast({
      title: "Export Started",
      description: "Your video is being exported. This may take a few minutes.",
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
          <h1 className="text-2xl font-bold">Video Editor</h1>
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
          <Button onClick={handleExport}>Export</Button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="grid grid-cols-12 gap-4 flex-grow">
        {/* Media Library */}
        <div className="col-span-3 bg-card rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-4">Media Library</h2>
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
                  <p>Drop files here or click to upload</p>
                </div>
              </Label>
            </div>
            <div className="space-y-2">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedTrack?.id === track.id ? 'bg-accent' : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedTrack(track)}
                >
                  <p className="font-medium truncate">{track.name}</p>
                  <p className="text-sm text-muted-foreground">{track.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview and Timeline */}
        <div className="col-span-9 space-y-4">
          {/* Preview Window */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
            <video
              ref={videoRef}
              className="w-full h-full"
              src={selectedTrack?.type === 'video' ? selectedTrack.url : undefined}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
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
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Scissors className="h-4 w-4 mr-2" />
                  Split
                </Button>
                <Button variant="outline" size="sm">
                  <Type className="h-4 w-4 mr-2" />
                  Text
                </Button>
                <Button variant="outline" size="sm">
                  <Music className="h-4 w-4 mr-2" />
                  Audio
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">
                  {Math.floor(currentTime / 60)}:
                  {String(Math.floor(currentTime % 60)).padStart(2, '0')}
                </span>
                <Slider
                  value={zoom}
                  onValueChange={setZoom}
                  max={100}
                  step={1}
                  className="w-32"
                />
              </div>
            </div>

            <div
              ref={timelineRef}
              className="h-32 bg-accent rounded-lg overflow-hidden relative"
              onClick={handleTimelineClick}
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={tracks}
                  strategy={horizontalListSortingStrategy}
                >
                  {/* Timeline tracks */}
                </SortableContext>
              </DndContext>
              <div
                className="absolute top-0 h-full w-0.5 bg-primary"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Audio Waveform */}
            <div ref={waveformRef} className="mt-4 h-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditorPage;