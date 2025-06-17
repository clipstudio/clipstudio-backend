import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { Toaster } from "@/components/ui/toaster";

// Layout Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Pages
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import ProjectPage from "@/pages/ProjectPage";
import SubscriptionPage from "@/pages/SubscriptionPage";
import StoryGeneratorPage from "@/pages/StoryGeneratorPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ImageGeneratorPage from "@/pages/ImageGeneratorPage";
import ContentClipperPage from "@/pages/ContentClipperPage";
import YouTubeUploadPage from "@/pages/YouTubeUploadPage";
import PaymentPage from "@/pages/PaymentPage";
import TextStoryPage from "@/pages/TextStoryPage";
import RedditStoryPage from "@/pages/RedditStoryPage";
import MyProjectsPage from "@/pages/MyProjectsPage";
import VideoEditorPage from "@/pages/VideoEditorPage";
import VoiceOverPage from "@/pages/VoiceOverPage";
import SplitScreenPage from "@/pages/SplitScreenPage";
import GptStoryPage from "@/pages/GptStoryPage";
import FeaturesPage from "@/pages/FeaturesPage"; // New Import

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/video-editor" element={<VideoEditorPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/my-projects" element={<MyProjectsPage />} />
                <Route path="/project/:id" element={<ProjectPage />} />
                <Route path="/story-generator" element={<StoryGeneratorPage />} />
                <Route path="/image-generator" element={<ImageGeneratorPage />} />
                <Route path="/content-clipper" element={<ContentClipperPage />} />
                <Route path="/youtube-upload" element={<YouTubeUploadPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/text-story" element={<TextStoryPage />} />
                <Route path="/reddit-story" element={<RedditStoryPage />} />
                <Route path="/voice-over" element={<VoiceOverPage />} />
                <Route path="/split-screen" element={<SplitScreenPage />} />
                <Route path="/gpt-story" element={<GptStoryPage />} />
                <Route path="/features" element={<FeaturesPage />} /> {/* New Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;