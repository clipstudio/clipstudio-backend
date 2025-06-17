import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => navigate("/")}>
        Return Home
      </Button>
    </div>
  );
};

export default NotFoundPage;