import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus, Video, Clock, Eye, TrendingUp, Film, Image as ImageIcon, Mic } from "lucide-react";
import { mockAnalytics } from "@/lib/mockData";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { projects, createProject } = useProjects();
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateProject = async () => {
    if (newProjectTitle.trim() && newProjectDescription.trim()) {
      const project = await createProject({
        title: newProjectTitle,
        description: newProjectDescription,
      });
      setNewProjectTitle("");
      setNewProjectDescription("");
      setIsDialogOpen(false);
      navigate(`/project/${project.id}`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "processing":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  // Credit Usage Section
  const creditUsage = {
    videos: { used: 25, total: 50 },
    exports: { used: 20, total: 40 },
    voiceover: { used: 15, total: 30 },
    aiVideos: { used: 45, total: 100 }
  };

  return (
    <div className="container py-8">
      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.totalVideos}</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.averageWatchTime} min</div>
            <p className="text-xs text-muted-foreground">+0.8 min from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Usage */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Credit Usage</CardTitle>
          <CardDescription>Your current plan usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Videos ({creditUsage.videos.used}/{creditUsage.videos.total})</span>
                <span>{Math.round((creditUsage.videos.used/creditUsage.videos.total) * 100)}%</span>
              </div>
              <Progress value={(creditUsage.videos.used/creditUsage.videos.total) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Export Minutes ({creditUsage.exports.used}/{creditUsage.exports.total})</span>
                <span>{Math.round((creditUsage.exports.used/creditUsage.exports.total) * 100)}%</span>
              </div>
              <Progress value={(creditUsage.exports.used/creditUsage.exports.total) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Voice Over Minutes ({creditUsage.voiceover.used}/{creditUsage.voiceover.total})</span>
                <span>{Math.round((creditUsage.voiceover.used/creditUsage.voiceover.total) * 100)}%</span>
              </div>
              <Progress value={(creditUsage.voiceover.used/creditUsage.voiceover.total) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Images ({creditUsage.aiVideos.used}/{creditUsage.aiVideos.total})</span>
                <span>{Math.round((creditUsage.aiVideos.used/creditUsage.aiVideos.total) * 100)}%</span>
              </div>
              <Progress value={(creditUsage.aiVideos.used/creditUsage.aiVideos.total) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Button 
          className="h-24 flex-col space-y-2"
          onClick={() => navigate("/content-clipper")}
        >
          <Video className="h-6 w-6" />
          <span>New Video</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex-col space-y-2"
          onClick={() => navigate("/image-generator")}
        >
          <ImageIcon className="h-6 w-6" />
          <span>Generate Image</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex-col space-y-2"
          onClick={() => navigate("/story-generator")}
        >
          <Mic className="h-6 w-6" />
          <span>Create Story</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex-col space-y-2"
          onClick={() => navigate("/youtube-upload")}
        >
          <Film className="h-6 w-6" />
          <span>Upload Video</span>
        </Button>
      </div>

      {/* Projects Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Your Projects</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Start a new video project. Add a title and description to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Enter project description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                    {project.status === "processing" && (
                      <Progress value={45} className="h-2" />
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      {project.duration > 0 && (
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {Math.floor(project.duration / 60)}:{String(project.duration % 60).padStart(2, '0')}
                        </div>
                      )}
                      {project.views > 0 && (
                        <div className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          {project.views}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tab contents remain the same */}
      </Tabs>
    </div>
  );
};

export default DashboardPage;