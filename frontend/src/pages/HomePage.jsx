import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Edit, Film, UploadCloud, Star, DollarSign, FileText, Palette, Download, Mic, Video, Search, BarChart3, TrendingUp, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const exampleVideos = [
    { id: 1, title: "Viral TikTok Dance", thumbnailAlt: "Person doing a viral TikTok dance", thumbnailSrc: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlrdG9rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
    { id: 2, title: "Quick Product Review", thumbnailAlt: "Gadget being reviewed with text overlays", thumbnailSrc: "https://images.unsplash.com/photo-1605520101496-5704c6aeae0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcnQlMjB2aWRlb3xlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60" },
    { id: 3, title: "AI Generated Story", thumbnailAlt: "Abstract visual representing AI and storytelling", thumbnailSrc: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWklMjBnZW5lcmF0ZWQlMjBjb250ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
    { id: 4, title: "Gaming Highlights", thumbnailAlt: "Split screen gameplay highlights", thumbnailSrc: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwaGlnaGxpZ2h0c3xlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60" },
    { id: 5, title: "Cooking Tutorial Snippet", thumbnailAlt: "Close up of food preparation", thumbnailSrc: "https://images.unsplash.com/photo-1556909172-6ab63f18fd12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va2luZyUyMHZpZGVvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  ];

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % exampleVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + exampleVideos.length) % exampleVideos.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextVideo();
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);


  const handleTryNow = () => {
    navigate("/subscription");
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      if (i < Math.floor(rating)) {
        return <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />;
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        return (
          <div key={i} className="relative">
            <Star className="h-5 w-5 fill-current text-gray-300" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star className="h-5 w-5 fill-current text-yellow-400" />
            </div>
          </div>
        );
      } else {
        return <Star key={i} className="h-5 w-5 fill-current text-gray-300" />;
      }
    });
  };

  const visibleVideos = () => {
    const videos = [];
    for (let i = 0; i < 3; i++) {
      videos.push(exampleVideos[(currentVideoIndex + i) % exampleVideos.length]);
    }
    return videos;
  };


  return (
    <div className="container relative">
      <div className="text-center text-sm text-muted-foreground mt-4">
        🚀 11,000+ Creators Are Using This to Go Viral & Earn Big
      </div>
      
      {/* Hero Section */}
      <section className="py-20 text-center">
        <motion.h1 
          className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gradient mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Generate Viral-Ready Clips<br />in Seconds
        </motion.h1>
        <motion.p 
          className="mx-auto max-w-[700px] text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your all-in-one tool for creating AI Videos, engaging subtitles, split-screen gameplay, and more.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button 
            size="lg" 
            onClick={handleTryNow} 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-16 py-6 text-lg h-auto rounded-full"
          >
            Start Editing Today
          </Button>
        </motion.div>
      </section>

      {/* Step-by-Step Formula Section */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to <span className="text-purple-500">Go Viral</span></h2>
          <p className="text-xl text-muted-foreground">
            Your Simple 4-Step Formula to Success
          </p>
        </div>

        <div className="flex flex-col max-w-3xl mx-auto space-y-8">
          <Card className="p-6 transform transition-all hover:scale-105">
            <CardContent className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10">
                <span className="text-2xl font-bold text-blue-500">1</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold flex items-center">
                  <Search className="h-6 w-6 text-blue-500 mr-2" />
                  Give Prompts to Write the Script
                </h3>
                <p className="text-muted-foreground">
                  Start by typing a few ideas or keywords. The AI script writer will use your prompts to generate a full video script for you. You don’t have to write it all yourself—just guide the AI with your topic or concept.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 transform transition-all hover:scale-105">
            <CardContent className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10">
                <span className="text-2xl font-bold text-purple-500">2</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold flex items-center">
                  <Video className="h-6 w-6 text-purple-500 mr-2" />
                  Customize the Look and Sound
                </h3>
                <p className="text-muted-foreground">
                  Pick a background video that fits your theme. Choose a voice to read your script, and add music from free built-in options. Make your video match your style.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 transform transition-all hover:scale-105">
            <CardContent className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500/10">
                <span className="text-2xl font-bold text-yellow-500">3</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold flex items-center">
                  <Download className="h-6 w-6 text-yellow-500 mr-2" />
                  Export Your Content
                </h3>
                <p className="text-muted-foreground">
                  Once your video is ready, export it the way you want. You can download the full video, just the voiceover, or the written script.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="p-6 transform transition-all hover:scale-105">
            <CardContent className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-500/10">
                <span className="text-2xl font-bold text-green-500">4</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold flex items-center">
                  <DollarSign className="h-6 w-6 text-green-500 mr-2" />
                  Share Online and Get Paid
                </h3>
                <p className="text-muted-foreground">
                  Post your video on TikTok, YouTube Shorts, or Instagram Reels. If your video gets popular, you can earn $2,000 to $5,000 for every million views through ads or creator programs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Clips Created Section */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <BarChart3 className="h-16 w-16 text-purple-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Over <span className="text-gradient">130,000 Clips</span> Have Been Made With ClipStudio</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ClipStudio's AI Tools Help You Catch Viral Trends And Create Content That Goes Viral With No Effort.
          </p>
        </motion.div>

        {/* Video Carousel */}
        <div className="relative max-w-4xl mx-auto"> {/* Adjusted max-width for taller videos */}
          <div className="overflow-hidden">
            <motion.div
              key={currentVideoIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-start space-x-4" // items-start to align taller cards
            >
              {visibleVideos().map((video) => (
                <Card key={video.id} className="w-1/4 bg-background/70 backdrop-blur-sm border-primary/20 transform hover:scale-105 transition-transform duration-300 overflow-hidden"> {/* Adjusted width to w-1/4 to make them slimmer for 9:16 */}
                  <CardContent className="p-0"> {/* Removed padding for full image bleed */}
                    <div className="relative aspect-[9/16] rounded-lg overflow-hidden group"> {/* Aspect ratio 9:16 */}
                      <img   
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                        alt={video.thumbnailAlt}
                       src="https://images.unsplash.com/photo-1579623003002-841f9dee24d0" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    {/* Removed title and description */}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 -translate-y-1/2 left-0 transform -translate-x-8 sm:-translate-x-12 rounded-full bg-background/80 hover:bg-primary/20 z-10" 
            onClick={prevVideo}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 -translate-y-1/2 right-0 transform translate-x-8 sm:translate-x-12 rounded-full bg-background/80 hover:bg-primary/20 z-10"
            onClick={nextVideo}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        {/* Removed "Explore AI Tools" button */}
      </section>

      {/* Success Stories Section */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground">
            See why people love ClipStudio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                {renderStars(4)}
              </div>
              <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full" alt="Sarah M profile picture" src="https://images.unsplash.com/photo-1652376939752-29c9924afd8e" />
                <div>
                  <div className="font-bold">Sarah M.</div>
                  <div className="text-sm text-muted-foreground">Video Editor</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Generated over 100 viral shorts in my first month. My channel grew from 1K to 50K subscribers!"
              </p>
              <div className="flex items-center justify-between mt-4 bg-blue-500/10 p-3 rounded-lg">
                <div className="flex items-center">
                  <img className="w-6 h-6 mr-2" alt="YouTube Shorts logo" src="https://images.unsplash.com/photo-1634942537034-2531766767d1" />
                  <span className="font-semibold">This month:</span>
                </div>
                <span className="text-green-500 font-bold">$12,450</span>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                {renderStars(4.5)}
              </div>
              <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full" alt="Mike R profile picture" src="https://images.unsplash.com/photo-1693756222675-a4b88ff09975" />
                <div>
                  <div className="font-bold">Mike R.</div>
                  <div className="text-sm text-muted-foreground">Clipper</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Feels like a cheat code. I can legitimately make more videos in less time. If you want to get started clipping, you gotta give it a try."
              </p>
              <div className="flex items-center justify-between mt-4 bg-pink-500/10 p-3 rounded-lg">
                <div className="flex items-center">
                  <img className="w-6 h-6 mr-2" alt="TikTok logo" src="https://images.unsplash.com/photo-1648007985579-b0d3877478a6" />
                  <span className="font-semibold">This month:</span>
                </div>
                <span className="text-green-500 font-bold">$6,820</span>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full" alt="Emma L profile picture" src="https://images.unsplash.com/photo-1698181520394-80656d4e987d" />
                <div>
                  <div className="font-bold">Emma L.</div>
                  <div className="text-sm text-muted-foreground">Content Creator</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Made my first $8,210 this month thanks to the viral shorts created with ClipStudio.io!"
              </p>
              <div className="flex items-center justify-between mt-4 bg-pink-500/10 p-3 rounded-lg">
                <div className="flex items-center">
                  <img className="w-6 h-6 mr-2" alt="TikTok logo" src="https://images.unsplash.com/photo-1648007985579-b0d3877478a6" />
                  <span className="font-semibold">This month:</span>
                </div>
                <span className="text-green-500 font-bold">$8,210</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto space-y-8">
          <h3 className="text-2xl font-bold mb-4">🚀 What If You Could Pump Out Hundreds Of Viral-Ready Short Videos in just Seconds</h3>
          <p className="text-lg text-muted-foreground">
            ClipStudio is the <span className="text-purple-500">#1</span> all-in-one AI content creation platform designed to help anyone — even total beginners — launch, grow, and monetize viral video channels.
          </p>
          <p className="text-lg text-muted-foreground">
            Platforms like <span className="text-white">TikTok</span> and <span className="text-white">YouTube Shorts</span> are rewarding creators for posting short-form videos — for every million views, you can earn between $2,000 and $5,000
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-12"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Go Viral?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of creators making $5,000+ monthly with ClipStudio.io
          </p>
          <Button 
            size="lg" 
            onClick={handleTryNow}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full"
          >
            Try Now For Free
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;