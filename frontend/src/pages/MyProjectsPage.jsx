import React from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";

const MyProjectsPage = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();

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

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Projects</h1>
        <Button onClick={() => navigate("/dashboard")} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="truncate">{project.title}</span>
                  <span className={`text-sm font-normal ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    {project.duration > 0 && (
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {Math.floor(project.duration / 60)}:{String(project.duration % 60).padStart(2, '0')}
                      </span>
                    )}
                    {project.views > 0 && (
                      <span className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        {project.views.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyProjectsPage;