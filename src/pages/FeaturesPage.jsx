import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Edit3, Scissors, Image, Youtube, MessageSquare, MessageCircle, Mic, Gamepad2, Bot, ArrowRight } from "lucide-react";

const featuresData = [
  {
    title: "1. Video Editor",
    description: "Professional timeline-based video editing for precise control over your creations.",
    icon: Edit3,
    path: "/video-editor",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/19e038944bf10a098ced21d8a9ec215a.png",
    altText: "modern video editing software interface",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    buttonColor: "bg-blue-500 hover:bg-blue-600"
  },
  {
    title: "2. AI Video Generation",
    description: "Transform text scripts or ideas into engaging video content automatically with GPT-powered AI.",
    icon: Video,
    path: "/story-generator",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/a6da3fb71b9f7ba5f11666f7341766c2.jpg",
    altText: "ai generating video from text",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    buttonColor: "bg-purple-500 hover:bg-purple-600"
  },
  {
    title: "3. Smart Content Clipper",
    description: "Automatically identify and extract the most viral-worthy moments from longer videos.",
    icon: Scissors,
    path: "/content-clipper",
    imgSrc: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
    altText: "scissors cutting film reel for content clipping",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    buttonColor: "bg-green-500 hover:bg-green-600"
  },
  {
    title: "4. AI Image Creation",
    description: "Generate stunning and unique images from simple text prompts using advanced AI models.",
    icon: Image,
    path: "/image-generator",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/19a67bfbff8380ed067ff4af2dbd70ca.jpg",
    altText: "ai creating art from text prompt",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600"
  },
  {
    title: "5. Content Download",
    description: "Easily download content directly from YouTube & TikTok to use in your projects.",
    icon: Youtube,
    path: "/youtube-upload",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/56d59a4ab832fd3185ac1e985719ec22.png",
    altText: "download icon with youtube and tiktok logos",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    buttonColor: "bg-red-500 hover:bg-red-600"
  },
  {
    title: "6. Text Story",
    description: "Create realistic and engaging text message conversation videos for storytelling.",
    icon: MessageSquare,
    path: "/text-story",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/15485ce441b69d0d2e1374ea71aab737.png",
    altText: "mobile phone showing text message conversation",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    buttonColor: "bg-sky-500 hover:bg-sky-600"
  },
  {
    title: "7. Reddit Story",
    description: "Generate entertaining videos based on popular Reddit posts and comment threads.",
    icon: MessageCircle,
    path: "/reddit-story",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/2a8121f9255b6ffd17f066573885c8d3.png",
    altText: "reddit alien logo with speech bubbles",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    buttonColor: "bg-orange-500 hover:bg-orange-600"
  },
  {
    title: "8. AI Voice Over",
    description: "Convert text to natural-sounding speech with a selection of over 10 custom AI voices.",
    icon: Mic,
    path: "/voice-over",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/c6627c3004b0ac8bf4b31d9090d3aace.png",
    altText: "microphone with sound waves for voice over",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    buttonColor: "bg-teal-500 hover:bg-teal-600"
  },
  {
    title: "9. Split Screen Gaming",
    description: "Easily create engaging split-screen videos featuring popular videogame footage templates.",
    icon: Gamepad2,
    path: "/split-screen",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/9202170863fe8239067c625e638c75f6.png",
    altText: "game controller with split screen effect",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    buttonColor: "bg-indigo-500 hover:bg-indigo-600"
  },
  {
    title: "10. GPT Story Generator",
    description: "Craft compelling and viral stories from scratch using advanced AI-powered storytelling.",
    icon: Bot,
    path: "/gpt-story",
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/c76d7364-4aff-43a0-a76d-24c82e354730/935eabe12d12735926e576a987c82baf.png",
    altText: "robot writing a story with a quill",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    buttonColor: "bg-pink-500 hover:bg-pink-600"
  }
];

const FeaturesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gradient">
          Our Suite of Powerful Tools
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the innovative features ClipStudio.io offers to supercharge your content creation, attract massive audiences, and monetize your viral videos.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-primary ${feature.bgColor.replace('bg-', 'border-')}`}>
              <CardHeader className={`p-0 ${feature.bgColor}`}>
                <div className="relative w-full h-48">
                  <img  
                    className="w-full h-full object-cover" 
                    alt={feature.altText}
                   src={feature.imgSrc} />
                  <div className={`absolute top-4 left-4 ${feature.bgColor} p-3 rounded-full shadow-md`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                <CardTitle className={`text-2xl font-bold mb-2 ${feature.color}`}>{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4 flex-grow">{feature.description}</CardDescription>
                <Button 
                  onClick={() => navigate(feature.path)} 
                  className={`w-full mt-auto ${feature.buttonColor} text-white`}
                >
                  Explore Feature <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: featuresData.length * 0.1 + 0.5 }}
        className="mt-20 text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-12"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Create Something Amazing?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          Unlock your creative potential and start building your viral empire today.
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate("/payment")}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full px-10 py-6 text-lg"
        >
          Get Started Now
        </Button>
      </motion.section>
    </div>
  );
};

export default FeaturesPage;