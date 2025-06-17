import React from "react";
import { Link } from "react-router-dom";
import { Video } from "lucide-react";

const Footer = () => {
  const footerSections = {
    "AI Workflows": [
      { name: "Fake texts videos", path: "/text-story" },
      { name: "Reddit video", path: "/reddit-story" },
      { name: "ChatGPT video", path: "/chatgpt-video" },
      { name: "Split-screen video", path: "/split-screen" },
      { name: "Streamer video", path: "/streamer" },
      { name: "Crayo Tools", path: "/crayo-tools" },
      { name: "AI brainstorm", path: "/ai-brainstorm" },
      { name: "AI images", path: "/image-generator" },
      { name: "AI voiceovers", path: "/voiceover" },
      { name: "YouTube downloader", path: "/youtube-downloader" },
      { name: "TikTok downloader", path: "/tiktok-downloader" }
    ],
    "Product": [
      { name: "Pricing", path: "/payment" },
      { name: "Enterprise", path: "/enterprise" }
    ],
    "Legal": [
      { name: "Refund policy", path: "/refund-policy" },
      { name: "Terms of service", path: "/terms" },
      { name: "Privacy policy", path: "/privacy" },
      { name: "Affiliate TOS", path: "/affiliate-terms" }
    ]
  };

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-medium mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Video className="h-6 w-6" />
              <span className="text-sm font-medium">ClipStudio.io</span>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://hostinger.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Hostinger
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/hostinger"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;