import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PaymentPage = () => {
  const plans = [
    {
      name: "Hobby",
      price: "19.99",
      description: "Perfect for beginners",
      features: [
        "50 AI videos monthly",
        "40 minutes of export",
        "30 voice over minutes",
        "100 AI images"
      ]
    },
    {
      name: "Clipper",
      price: "39",
      description: "Most popular choice",
      features: [
        "150 AI videos monthly",
        "2 hours of export",
        "120 voice over minutes",
        "300 AI images"
      ],
      popular: true
    },
    {
      name: "Pro",
      price: "79",
      description: "For power users",
      features: [
        "250 AI videos monthly",
        "3 hours of export",
        "Unlimited voice over",
        "500 AI images"
      ]
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my plan?",
      answer: "Yes, you can cancel your subscription at any time. Your access will remain active until the end of your current billing period."
    },
    {
      question: "How do I view how many credits I have left?",
      answer: "You can view your remaining credits in your dashboard under the 'Credits' section. This shows all your remaining AI videos, export minutes, and voice over minutes."
    },
    {
      question: "Can I change my plan after I subscribe?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
    },
    {
      question: "How soon can I get paid?",
      answer: "Today! Once you start creating and monetizing content, you can begin earning immediately."
    },
    {
      question: "What is an export minute?",
      answer: "An export minute represents one minute of video content that you can export from our platform. For example, if you create a 5-minute video, it will use 5 export minutes from your quota."
    },
    {
      question: "What is an AI video credit?",
      answer: "An AI video credit allows you to generate one video using our AI technology. Each time you create a new video using our AI tools, one credit is deducted from your monthly allowance."
    },
    {
      question: "Can I monetize videos created with ClipStudio.io?",
      answer: "Yes! You have full commercial rights to all content created using ClipStudio.io. You can monetize your videos on any platform including YouTube, TikTok, and Instagram."
    },
    {
      question: "Can I import my own content to ClipStudio.io?",
      answer: "Yes, you can import your own videos, images, and audio files to use alongside our AI-generated content. This allows you to mix custom content with AI-generated elements."
    }
  ];

  return (
    <div className="container py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Start creating viral content today with our powerful AI tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                      : ''
                  }`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;