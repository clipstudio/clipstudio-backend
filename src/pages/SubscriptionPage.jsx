import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SubscriptionPage = () => {
  const handlePayment = (planId) => {
    window.location.href = `https://link.com/pay/${planId}`;
  };

  const plans = [
    {
      id: "hobby",
      name: "Hobby",
      price: 19.99,
      description: "Perfect for beginners",
      features: [
        "50 videos monthly",
        "40 minutes of export",
        "30 voice over minutes",
        "100 AI videos",
      ],
      popular: false
    },
    {
      id: "clipper",
      name: "Clipper",
      price: 39,
      description: "Most popular choice",
      features: [
        "150 AI videos",
        "2 hours of export",
        "120 voice over minutes",
        "300 AI images",
        "Priority support"
      ],
      popular: true
    },
    {
      id: "pro",
      name: "Pro",
      price: 79,
      description: "For power users",
      features: [
        "250 AI videos monthly",
        "3 hours of export",
        "500 AI images",
        "Unlimited voice over",
        "24/7 Priority support",
        "Custom branding"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my plan?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    },
    {
      question: "How do I view how many credits I have left?",
      answer: "You can view your remaining credits in your dashboard under the 'Credits' section. We'll also notify you when you're running low."
    },
    {
      question: "Can I change my plan after I subscribe?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
    },
    {
      question: "What is an export minute?",
      answer: "An export minute refers to the duration of the final video you export from our platform. For example, a 3-minute video uses 3 export minutes from your quota."
    },
    {
      question: "What is an AI video credit?",
      answer: "An AI video credit allows you to generate one AI-powered video. Each generated video, regardless of length, uses one credit from your monthly allowance."
    },
    {
      question: "Can I monetize videos created with ClipStudio.io?",
      answer: "Yes! You retain full commercial rights to all content created using our platform and can monetize it on any platform."
    },
    {
      question: "Can I import my own content to ClipStudio.io?",
      answer: "Yes, you can import your own videos, images, and audio files to use in your projects. We support most common file formats."
    },
    {
      question: "Can I make videos without ever showing my face?",
      answer: "Yes! Many of our tools, like AI Voice Over, Text Story, and AI Video Generation, allow you to create compelling content without needing to appear on camera. You can use stock footage, AI-generated visuals, or screen recordings combined with AI voices or your own voiceover."
    }
  ];

  return (
    <div className="container py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Join over 8,000 creators making viral content with ClipStudio.io
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                  onClick={() => handlePayment(plan.id)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-muted-foreground" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;