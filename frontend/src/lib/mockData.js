// Mock data for the application
export const mockProjects = [
  {
    id: "1",
    title: "Gaming Highlights",
    description: "Compilation of my best gaming moments",
    thumbnail: "gaming-thumbnail",
    createdAt: "2025-05-28T10:30:00Z",
    status: "completed",
    duration: 120,
    views: 1250,
  },
  {
    id: "2",
    title: "Product Review",
    description: "Honest review of the latest tech gadget",
    thumbnail: "review-thumbnail",
    createdAt: "2025-05-25T14:20:00Z",
    status: "processing",
    duration: 180,
    views: 850,
  },
  {
    id: "3",
    title: "Tutorial Series",
    description: "How to master advanced techniques",
    thumbnail: "tutorial-thumbnail",
    createdAt: "2025-05-20T09:15:00Z",
    status: "completed",
    duration: 300,
    views: 3200,
  },
  {
    id: "4",
    title: "Reaction Video",
    description: "My reaction to the latest trailer",
    thumbnail: "reaction-thumbnail",
    createdAt: "2025-05-15T16:45:00Z",
    status: "draft",
    duration: 0,
    views: 0,
  },
];

export const mockAnalytics = {
  totalViews: 25600,
  totalVideos: 12,
  averageWatchTime: 4.2,
  topPerformers: [
    { id: "3", title: "Tutorial Series", views: 3200 },
    { id: "5", title: "Gameplay Walkthrough", views: 2800 },
    { id: "7", title: "Commentary Track", views: 2400 },
  ],
  viewsOverTime: [
    { date: "2025-04-01", views: 1200 },
    { date: "2025-04-08", views: 1500 },
    { date: "2025-04-15", views: 1800 },
    { date: "2025-04-22", views: 2100 },
    { date: "2025-04-29", views: 2400 },
    { date: "2025-05-06", views: 2700 },
    { date: "2025-05-13", views: 3000 },
    { date: "2025-05-20", views: 3300 },
    { date: "2025-05-27", views: 3600 },
  ],
};

export const mockVoices = [
  { id: "v1", name: "Alex", gender: "Male", accent: "American", sample: "sample-url-1" },
  { id: "v2", name: "Emma", gender: "Female", accent: "British", sample: "sample-url-2" },
  { id: "v3", name: "Carlos", gender: "Male", accent: "Spanish", sample: "sample-url-3" },
  { id: "v4", name: "Sophia", gender: "Female", accent: "Australian", sample: "sample-url-4" },
  { id: "v5", name: "Hiroshi", gender: "Male", accent: "Japanese", sample: "sample-url-5" },
  { id: "v6", name: "Zara", gender: "Female", accent: "Indian", sample: "sample-url-6" },
];

export const mockTemplates = [
  { id: "t1", name: "Gaming Highlight", category: "Gaming", duration: 60 },
  { id: "t2", name: "Product Review", category: "Tech", duration: 120 },
  { id: "t3", name: "Tutorial", category: "Education", duration: 300 },
  { id: "t4", name: "Reaction", category: "Entertainment", duration: 90 },
  { id: "t5", name: "Vlog Intro", category: "Lifestyle", duration: 30 },
  { id: "t6", name: "News Summary", category: "News", duration: 180 },
];

export const mockSubscriptionPlans = {
  monthly: {
    id: "price_monthly",
    name: "Monthly Plan",
    price: 20,
    features: [
      "Unlimited video generation",
      "Access to all voice options",
      "HD video quality",
      "Priority processing",
      "Email support"
    ],
    billingPeriod: "monthly"
  }
};

export const mockUser = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "user-avatar",
  subscription: {
    status: "active",
    plan: "monthly",
    nextBillingDate: "2025-06-30"
  },
  createdAt: "2025-01-15T08:30:00Z"
};