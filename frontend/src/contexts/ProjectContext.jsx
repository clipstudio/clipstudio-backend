import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext(undefined);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProjects();
    } else {
      setProjects([]);
      setLoading(false);
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getProject = async (id) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch project.",
        variant: "destructive",
      });
      return null;
    }
  };

  const createProject = async (projectData) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          user_id: user.id,
          ...projectData
        }])
        .select()
        .single();

      if (error) throw error;

      setProjects([data, ...projects]);

      toast({
        title: "Project created",
        description: "Your new project has been created successfully.",
      });

      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProjects(projects.map(p => p.id === id ? data : p));

      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });

      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteProject = async (id) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));

      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive",
      });
      return false;
    }
  };

  const generateVideo = async (projectId) => {
    try {
      // Update project status to processing
      const { data: updatedProject, error: updateError } = await supabase
        .from('projects')
        .update({ status: 'processing' })
        .eq('id', projectId)
        .select()
        .single();

      if (updateError) throw updateError;

      setProjects(projects.map(p => p.id === projectId ? updatedProject : p));

      toast({
        title: "Video generation started",
        description: "Your video is being generated. This may take a few minutes.",
      });

      // Simulate video generation process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update project status to completed
      const { data: completedProject, error: completeError } = await supabase
        .from('projects')
        .update({
          status: 'completed',
          duration: Math.floor(Math.random() * 180) + 60 // Random duration between 60-240 seconds
        })
        .eq('id', projectId)
        .select()
        .single();

      if (completeError) throw completeError;

      setProjects(projects.map(p => p.id === projectId ? completedProject : p));

      toast({
        title: "Video generated",
        description: "Your video has been generated successfully.",
      });

      return completedProject;
    } catch (error) {
      // Update project status back to draft in case of error
      const { data: failedProject } = await supabase
        .from('projects')
        .update({ status: 'draft' })
        .eq('id', projectId)
        .select()
        .single();

      if (failedProject) {
        setProjects(projects.map(p => p.id === projectId ? failedProject : p));
      }

      toast({
        title: "Generation failed",
        description: "There was an error generating your video. Please try again.",
        variant: "destructive",
      });

      return null;
    }
  };

  const value = {
    projects,
    loading,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    generateVideo,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};