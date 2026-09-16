import { unsplash } from "./utils";

export type ServiceGroup = "core" | "growth";

export type IconName =
  | "web" | "mobile" | "marketing" | "branding" | "video" | "email"
  | "ai" | "whatsapp" | "software" | "data" | "transform";

export type Service = {
  slug: string;
  number: string;
  group: ServiceGroup;
  icon: IconName;
  title: string;
  /** One-liner used on cards */
  short: string;
  /** Full description from the service catalogue */
  description: string;
  items: string[];
  image: string;
};

export const serviceGroups: Record<ServiceGroup, { title: string; label: string; description: string }> = {
  core: {
    label: "Core Services",
    title: "Core Services",
    description: "The essential digital services businesses commonly need.",
  },
  growth: {
    label: "Growth & Technology",
    title: "Growth & Technology Solutions",
    description: "Higher-value systems that help businesses acquire customers, automate work and use AI.",
  },
};

export const positioning =
  "Core Services cover everyday business requirements. Growth & Technology Solutions differentiate Aarambh Infinity through AI, automation, conversational commerce, business platforms and transformation.";

export const services: Service[] = [
  {
    slug: "web-digital-experience",
    number: "01",
    group: "core",
    icon: "web",
    title: "Web & Digital Experience",
    short: "Websites, web apps and digital experiences for modern businesses.",
    description:
      "Websites and digital experiences designed to present your business professionally and convert visitors into customers.",
    items: [
      "Business Websites", "Corporate Websites", "E-commerce Websites", "Landing Pages", "Website Redesign",
      "Web Applications", "CMS Development", "UI/UX Design", "API Integration", "Website Maintenance",
      "Performance Optimization",
    ],
    image: unsplash("photo-1467232004584-a241de8bcf5d"),
  },
  {
    slug: "mobile-app-development",
    number: "02",
    group: "core",
    icon: "mobile",
    title: "Mobile App Development",
    short: "Android, iOS and cross-platform apps built around your goals.",
    description: "Mobile applications built around your customers, business processes and digital products.",
    items: [
      "Android Development", "iOS Development", "Cross-Platform Apps", "Business Applications", "E-commerce Apps",
      "Customer Apps", "Service Apps", "Payment Integration", "API Integration", "App Maintenance",
    ],
    image: unsplash("photo-1512941937669-90a1b58e7e9c"),
  },
  {
    slug: "digital-marketing-seo",
    number: "03",
    group: "core",
    icon: "marketing",
    title: "Digital Marketing & SEO",
    short: "Get found, get leads, get results with data-driven marketing.",
    description:
      "Strategies and campaigns that improve visibility, reach the right audience and generate qualified enquiries.",
    items: [
      "SEO", "Technical SEO", "Local SEO", "Keyword Research", "Google Ads", "Meta Ads", "Social Media Marketing",
      "Content Marketing", "Lead Generation", "Remarketing", "Conversion Optimization", "Marketing Analytics",
    ],
    image: unsplash("photo-1460925895917-afdab827c52f"),
  },
  {
    slug: "branding-creative",
    number: "04",
    group: "core",
    icon: "branding",
    title: "Branding & Creative",
    short: "Build a brand people recognize and remember.",
    description:
      "Visual identities and creative systems that make businesses recognizable and consistent across every channel.",
    items: [
      "Logo Design", "Brand Identity", "Visual Identity", "Brand Guidelines", "Graphic Design",
      "Social Media Creatives", "Advertising Creatives", "Brochures", "Company Profiles", "Presentation Design",
      "UI/UX Design", "Campaign Design",
    ],
    image: unsplash("photo-1558655146-9f40138edfeb"),
  },
  {
    slug: "video-photography",
    number: "05",
    group: "core",
    icon: "video",
    title: "Video & Photography",
    short: "Visual content that tells your story and drives engagement.",
    description: "Professional visual content for brands, products, marketing campaigns and digital platforms.",
    items: [
      "Product Photography", "Corporate Photography", "Brand Photography", "Event Photography", "Product Videos",
      "Corporate Videos", "Promotional Videos", "Brand Videos", "Social Media Videos", "Short-form Videos",
      "Motion Graphics", "Video Editing",
    ],
    image: unsplash("photo-1492691527719-9d1e07e534b4"),
  },
  {
    slug: "email-customer-engagement",
    number: "06",
    group: "core",
    icon: "email",
    title: "Email & Customer Engagement",
    short: "Nurture leads and build stronger customer relationships.",
    description:
      "Email campaigns and automated communication designed to nurture leads and maintain customer relationships.",
    items: [
      "Email Marketing", "Newsletter Design", "Promotional Campaigns", "Lead Nurturing", "Email Automation",
      "Customer Segmentation", "Personalization", "A/B Testing", "Campaign Analytics", "Customer Updates",
      "Re-engagement Campaigns",
    ],
    image: unsplash("photo-1486312338219-ce68d2c6f44d"),
  },
  {
    slug: "ai-business-automation",
    number: "07",
    group: "growth",
    icon: "ai",
    title: "AI & Business Automation",
    short: "Automate work. Save time. Achieve more with AI.",
    description:
      "Intelligent systems that automate repetitive work, improve response times and reduce manual operations.",
    items: [
      "AI Chatbots", "AI Customer Support", "AI Sales Agents", "AI Assistants", "AI Lead Qualification",
      "AI Follow-ups", "AI Email Automation", "Document Processing", "Workflow Automation", "CRM Automation",
      "AI Reporting", "Internal AI Tools",
    ],
    image: unsplash("photo-1677442136019-21780ecad995"),
  },
  {
    slug: "whatsapp-conversational-commerce",
    number: "08",
    group: "growth",
    icon: "whatsapp",
    title: "WhatsApp & Conversational Commerce",
    short: "Turn WhatsApp into a powerful sales and support channel.",
    description: "Turn WhatsApp into a sales, support and customer-engagement platform.",
    items: [
      "WhatsApp Business API", "WhatsApp Automation", "WhatsApp Campaigns", "AI WhatsApp Agents", "Lead Capture",
      "Lead Qualification", "Automated Follow-ups", "Appointment Booking", "Customer Notifications", "Order Updates",
      "Customer Segmentation", "CRM Integration", "WhatsApp Analytics",
    ],
    image: unsplash("photo-1512428559087-560fa5ceab42"),
  },
  {
    slug: "business-software-platforms",
    number: "09",
    group: "growth",
    icon: "software",
    title: "Business Software & Custom Platforms",
    short: "Custom systems that fit the way your business works.",
    description:
      "Custom digital platforms that replace manual processes and connect different parts of a business.",
    items: [
      "CRM Systems", "Lead Management", "Dealer Management", "Customer Portals", "Employee Portals",
      "Order Management", "Inventory Systems", "Booking Systems", "Approval Systems", "Internal Dashboards",
      "Business Management Systems", "Third-party Integrations", "Payment Systems",
    ],
    image: unsplash("photo-1517694712202-14dd9538aa97"),
  },
  {
    slug: "data-analytics-business-intelligence",
    number: "10",
    group: "growth",
    icon: "data",
    title: "Data, Analytics & Business Intelligence",
    short: "Turn data into decisions with powerful insights.",
    description: "Turn business data into useful dashboards, reports and insights for better decision-making.",
    items: [
      "Business Dashboards", "Sales Analytics", "Marketing Analytics", "Customer Analytics", "KPI Dashboards",
      "Automated Reports", "Data Integration", "Data Visualization", "Performance Monitoring", "Management Reporting",
    ],
    image: unsplash("photo-1551288049-bebda4e38f71"),
  },
  {
    slug: "ai-digital-transformation",
    number: "11",
    group: "growth",
    icon: "transform",
    title: "AI & Digital Transformation",
    short: "Modernize, automate and transform your business.",
    description:
      "Modernize business processes by identifying where technology, automation and AI can create measurable improvements.",
    items: [
      "AI Readiness Assessment", "AI Strategy", "Process Automation", "Workflow Digitization", "AI Knowledge Systems",
      "Internal AI Assistants", "Sales Automation", "Customer Service Automation", "Document Automation",
      "Business Process Optimization", "Digital Transformation Consulting",
    ],
    image: unsplash("photo-1485827404703-89b55fcc595e"),
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
