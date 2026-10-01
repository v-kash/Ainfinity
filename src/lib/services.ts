// import { unsplash } from "./utils";

// export type ServiceGroup = "core" | "growth";

// export type IconName =
//   | "web" | "mobile" | "marketing" | "branding" | "video" | "email"
//   | "ai" | "whatsapp" | "software" | "data" | "transform";

// export type Service = {
//   slug: string;
//   number: string;
//   group: ServiceGroup;
//   icon: IconName;
//   title: string;
//   /** One-liner used on cards */
//   short: string;
//   /** Full description from the service catalogue */
//   description: string;
//   items: string[];
//   image: string;
// };

// export const serviceGroups: Record<ServiceGroup, { title: string; label: string; description: string }> = {
//   core: {
//     label: "Core Services",
//     title: "Core Services",
//     description: "The essential digital services businesses commonly need.",
//   },
//   growth: {
//     label: "Growth & Technology",
//     title: "Growth & Technology Solutions",
//     description: "Higher-value systems that help businesses acquire customers, automate work and use AI.",
//   },
// };

// export const positioning =
//   "Core Services cover everyday business requirements. Growth & Technology Solutions differentiate Aarambh Infinity through AI, automation, conversational commerce, business platforms and transformation.";

// export const services: Service[] = [
//   {
//     slug: "web-digital-experience",
//     number: "01",
//     group: "core",
//     icon: "web",
//     title: "Web & Digital Experience",
//     short: "Websites, web apps and digital experiences for modern businesses.",
//     description:
//       "Websites and digital experiences designed to present your business professionally and convert visitors into customers.",
//     items: [
//       "Business Websites", "Corporate Websites", "E-commerce Websites", "Landing Pages", "Website Redesign",
//       "Web Applications", "CMS Development", "UI/UX Design", "API Integration", "Website Maintenance",
//       "Performance Optimization",
//     ],
//     image: unsplash("photo-1467232004584-a241de8bcf5d"),
//   },
//   {
//     slug: "mobile-app-development",
//     number: "02",
//     group: "core",
//     icon: "mobile",
//     title: "Mobile App Development",
//     short: "Android, iOS and cross-platform apps built around your goals.",
//     description: "Mobile applications built around your customers, business processes and digital products.",
//     items: [
//       "Android Development", "iOS Development", "Cross-Platform Apps", "Business Applications", "E-commerce Apps",
//       "Customer Apps", "Service Apps", "Payment Integration", "API Integration", "App Maintenance",
//     ],
//     image: unsplash("photo-1512941937669-90a1b58e7e9c"),
//   },
//   {
//     slug: "digital-marketing-seo",
//     number: "03",
//     group: "core",
//     icon: "marketing",
//     title: "Digital Marketing & SEO",
//     short: "Get found, get leads, get results with data-driven marketing.",
//     description:
//       "Strategies and campaigns that improve visibility, reach the right audience and generate qualified enquiries.",
//     items: [
//       "SEO", "Technical SEO", "Local SEO", "Keyword Research", "Google Ads", "Meta Ads", "Social Media Marketing",
//       "Content Marketing", "Lead Generation", "Remarketing", "Conversion Optimization", "Marketing Analytics",
//     ],
//     image: unsplash("photo-1460925895917-afdab827c52f"),
//   },
//   {
//     slug: "branding-creative",
//     number: "04",
//     group: "core",
//     icon: "branding",
//     title: "Branding & Creative",
//     short: "Build a brand people recognize and remember.",
//     description:
//       "Visual identities and creative systems that make businesses recognizable and consistent across every channel.",
//     items: [
//       "Logo Design", "Brand Identity", "Visual Identity", "Brand Guidelines", "Graphic Design",
//       "Social Media Creatives", "Advertising Creatives", "Brochures", "Company Profiles", "Presentation Design",
//       "UI/UX Design", "Campaign Design",
//     ],
//     image: unsplash("photo-1558655146-9f40138edfeb"),
//   },
//   {
//     slug: "video-photography",
//     number: "05",
//     group: "core",
//     icon: "video",
//     title: "Video & Photography",
//     short: "Visual content that tells your story and drives engagement.",
//     description: "Professional visual content for brands, products, marketing campaigns and digital platforms.",
//     items: [
//       "Product Photography", "Corporate Photography", "Brand Photography", "Event Photography", "Product Videos",
//       "Corporate Videos", "Promotional Videos", "Brand Videos", "Social Media Videos", "Short-form Videos",
//       "Motion Graphics", "Video Editing",
//     ],
//     image: unsplash("photo-1492691527719-9d1e07e534b4"),
//   },
//   {
//     slug: "email-customer-engagement",
//     number: "06",
//     group: "core",
//     icon: "email",
//     title: "Email & Customer Engagement",
//     short: "Nurture leads and build stronger customer relationships.",
//     description:
//       "Email campaigns and automated communication designed to nurture leads and maintain customer relationships.",
//     items: [
//       "Email Marketing", "Newsletter Design", "Promotional Campaigns", "Lead Nurturing", "Email Automation",
//       "Customer Segmentation", "Personalization", "A/B Testing", "Campaign Analytics", "Customer Updates",
//       "Re-engagement Campaigns",
//     ],
//     image: unsplash("photo-1486312338219-ce68d2c6f44d"),
//   },
//   {
//     slug: "ai-business-automation",
//     number: "07",
//     group: "growth",
//     icon: "ai",
//     title: "AI & Business Automation",
//     short: "Automate work. Save time. Achieve more with AI.",
//     description:
//       "Intelligent systems that automate repetitive work, improve response times and reduce manual operations.",
//     items: [
//       "AI Chatbots", "AI Customer Support", "AI Sales Agents", "AI Assistants", "AI Lead Qualification",
//       "AI Follow-ups", "AI Email Automation", "Document Processing", "Workflow Automation", "CRM Automation",
//       "AI Reporting", "Internal AI Tools",
//     ],
//     image: unsplash("photo-1677442136019-21780ecad995"),
//   },
//   {
//     slug: "whatsapp-conversational-commerce",
//     number: "08",
//     group: "growth",
//     icon: "whatsapp",
//     title: "WhatsApp & Conversational Commerce",
//     short: "Turn WhatsApp into a powerful sales and support channel.",
//     description: "Turn WhatsApp into a sales, support and customer-engagement platform.",
//     items: [
//       "WhatsApp Business API", "WhatsApp Automation", "WhatsApp Campaigns", "AI WhatsApp Agents", "Lead Capture",
//       "Lead Qualification", "Automated Follow-ups", "Appointment Booking", "Customer Notifications", "Order Updates",
//       "Customer Segmentation", "CRM Integration", "WhatsApp Analytics",
//     ],
//     image: unsplash("photo-1512428559087-560fa5ceab42"),
//   },
//   {
//     slug: "business-software-platforms",
//     number: "09",
//     group: "growth",
//     icon: "software",
//     title: "Business Software & Custom Platforms",
//     short: "Custom systems that fit the way your business works.",
//     description:
//       "Custom digital platforms that replace manual processes and connect different parts of a business.",
//     items: [
//       "CRM Systems", "Lead Management", "Dealer Management", "Customer Portals", "Employee Portals",
//       "Order Management", "Inventory Systems", "Booking Systems", "Approval Systems", "Internal Dashboards",
//       "Business Management Systems", "Third-party Integrations", "Payment Systems",
//     ],
//     image: unsplash("photo-1517694712202-14dd9538aa97"),
//   },
//   {
//     slug: "data-analytics-business-intelligence",
//     number: "10",
//     group: "growth",
//     icon: "data",
//     title: "Data, Analytics & Business Intelligence",
//     short: "Turn data into decisions with powerful insights.",
//     description: "Turn business data into useful dashboards, reports and insights for better decision-making.",
//     items: [
//       "Business Dashboards", "Sales Analytics", "Marketing Analytics", "Customer Analytics", "KPI Dashboards",
//       "Automated Reports", "Data Integration", "Data Visualization", "Performance Monitoring", "Management Reporting",
//     ],
//     image: unsplash("photo-1551288049-bebda4e38f71"),
//   },
//   {
//     slug: "ai-digital-transformation",
//     number: "11",
//     group: "growth",
//     icon: "transform",
//     title: "AI & Digital Transformation",
//     short: "Modernize, automate and transform your business.",
//     description:
//       "Modernize business processes by identifying where technology, automation and AI can create measurable improvements.",
//     items: [
//       "AI Readiness Assessment", "AI Strategy", "Process Automation", "Workflow Digitization", "AI Knowledge Systems",
//       "Internal AI Assistants", "Sales Automation", "Customer Service Automation", "Document Automation",
//       "Business Process Optimization", "Digital Transformation Consulting",
//     ],
//     image: unsplash("photo-1485827404703-89b55fcc595e"),
//   },
// ];

// export const getService = (slug: string) => services.find((s) => s.slug === slug);


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
  seo: ServiceSeo;
};

/** Search copy for a service page. Each FAQ is shown on the page and mirrored in its FAQPage schema. */
export type ServiceSeo = {
  /** Full <title>; already includes the brand where wanted, so it skips the layout template */
  title: string;
  description: string;
  heading: string;
  faqs: { question: string; answer: string }[];
};

export const serviceGroups: Record<ServiceGroup, { title: string; label: string; description: string }> = {
  core: {
    label: "Core Services",
    title: "Core Services",
    description: "The digital services most businesses need day to day.",
  },
  growth: {
    label: "Growth & Technology",
    title: "Growth & Technology Solutions",
    description: "Higher-value systems for winning customers and automating work with AI.",
  },
};

export const positioning =
  "Core Services handle everyday business needs. Growth & Technology Solutions are where Aarambh Infinity stands apart, with work in AI, automation, conversational commerce, business platforms and transformation.";

export const services: Service[] = [
  {
    slug: "web-digital-experience",
    number: "01",
    group: "core",
    icon: "web",
    title: "Web & Digital Experience",
    short: "Websites and web apps built to win customers.",
    description:
      "Websites that present your business professionally and turn visitors into customers.",
    items: [
      "Business Websites", "Corporate Websites", "E-commerce Websites", "Landing Pages", "Website Redesign",
      "Web Applications", "CMS Development", "UI/UX Design", "API Integration", "Website Maintenance",
      "Performance Optimization",
    ],
    image: unsplash("photo-1467232004584-a241de8bcf5d"),
    seo: {
      title: "Web Development & Digital Experience Services | Aarambh Infinity",
      description:
        "Business websites, corporate sites, e-commerce, landing pages, web apps, CMS, UI/UX, API integration, maintenance and performance optimization.",
      heading: "Web Development & Digital Experience Services",
      faqs: [
        {
          question: "What web development services do you provide?",
          answer:
            "We build business and corporate websites, e-commerce sites, landing pages, web applications and CMS-based experiences, with UI/UX, API integration, maintenance and performance optimization where required.",
        },
        {
          question: "When should a business redesign its website?",
          answer:
            "A redesign is useful when the current site is slow, difficult to use, outdated, hard to manage, not mobile-friendly or not converting visitors into enquiries or sales.",
        },
      ],
    },
  },
  {
    slug: "mobile-app-development",
    number: "02",
    group: "core",
    icon: "mobile",
    title: "Mobile App Development",
    short: "Android, iOS and cross-platform apps built around your goals.",
    description: "Mobile apps for your customers, your internal processes or a digital product of your own.",
    items: [
      "Android Development", "iOS Development", "Cross-Platform Apps", "Business Applications", "E-commerce Apps",
      "Customer Apps", "Service Apps", "Payment Integration", "API Integration", "App Maintenance",
    ],
    image: unsplash("photo-1512941937669-90a1b58e7e9c"),
    seo: {
      title: "Mobile App Development Services | Android, iOS & Cross-Platform",
      description:
        "Android, iOS and cross-platform mobile app development for customer apps, business applications, e-commerce, payments, integrations and ongoing maintenance.",
      heading: "Mobile App Development for Android, iOS & Cross-Platform",
      faqs: [
        {
          question: "What types of mobile apps can you build?",
          answer:
            "We can build customer apps, internal business applications, e-commerce apps, service apps and other digital products for Android, iOS or cross-platform deployment, depending on product requirements.",
        },
        {
          question: "Should I choose native or cross-platform development?",
          answer:
            "The right approach depends on performance needs, device features, budget, release speed and long-term product plans. The technical approach should be selected after reviewing the use case and roadmap.",
        },
      ],
    },
  },
  {
    slug: "digital-marketing-seo",
    number: "03",
    group: "core",
    icon: "marketing",
    title: "Digital Marketing & SEO",
    short: "Marketing and SEO that bring in enquiries you can measure.",
    description:
      "Strategy and campaigns that make you easier to find and bring in qualified enquiries from the right audience.",
    items: [
      "SEO", "Technical SEO", "Local SEO", "Keyword Research", "Google Ads", "Meta Ads", "Social Media Marketing",
      "Content Marketing", "Lead Generation", "Remarketing", "Conversion Optimization", "Marketing Analytics",
    ],
    image: unsplash("photo-1460925895917-afdab827c52f"),
    seo: {
      title: "Digital Marketing & SEO Services | Aarambh Infinity",
      description:
        "SEO, technical SEO, local SEO, keyword research, Google Ads, Meta Ads, content marketing, lead generation, remarketing, conversion optimization and analytics.",
      heading: "Digital Marketing & SEO Services for Measurable Growth",
      faqs: [
        {
          question: "What is included in your SEO service?",
          answer:
            "SEO can include technical SEO, keyword research, on-page optimization, local SEO, content planning, internal linking, measurement and ongoing improvements based on search performance.",
        },
        {
          question: "How long does SEO take?",
          answer:
            "SEO timelines vary by website condition, competition, market, content quality and authority. Technical fixes can improve crawlability quickly, while meaningful organic growth normally requires sustained work and measurement.",
        },
      ],
    },
  },
  {
    slug: "branding-creative",
    number: "04",
    group: "core",
    icon: "branding",
    title: "Branding & Creative",
    short: "Build a brand people recognize and remember.",
    description:
      "Logos, identities and design systems that keep your business looking consistent on every channel.",
    items: [
      "Logo Design", "Brand Identity", "Visual Identity", "Brand Guidelines", "Graphic Design",
      "Social Media Creatives", "Advertising Creatives", "Brochures", "Company Profiles", "Presentation Design",
      "UI/UX Design", "Campaign Design",
    ],
    image: unsplash("photo-1558655146-9f40138edfeb"),
    seo: {
      title: "Branding, Logo & Creative Design Services | Aarambh Infinity",
      description:
        "Logo design, brand identity, visual systems, brand guidelines, social creatives, brochures, company profiles, presentations, UI/UX and campaign design.",
      heading: "Branding & Creative Design Services",
      faqs: [
        {
          question: "What does a brand identity project include?",
          answer:
            "A brand identity can include logo design, visual identity, typography, color system, graphic direction and brand guidelines, with additional collateral based on where the brand will appear.",
        },
        {
          question: "Do you design marketing collateral too?",
          answer:
            "Yes. The service scope can include social media creatives, advertising creatives, brochures, company profiles, presentations, UI/UX and campaign design.",
        },
      ],
    },
  },
  {
    slug: "video-photography",
    number: "05",
    group: "core",
    icon: "video",
    title: "Video & Photography",
    short: "Photos and videos that get people to stop and look.",
    description: "Professional photography and video for your brand, products, campaigns and online channels.",
    items: [
      "Product Photography", "Corporate Photography", "Brand Photography", "Event Photography", "Product Videos",
      "Corporate Videos", "Promotional Videos", "Brand Videos", "Social Media Videos", "Short-form Videos",
      "Motion Graphics", "Video Editing",
    ],
    image: unsplash("photo-1492691527719-9d1e07e534b4"),
    seo: {
      title: "Corporate Video & Photography Services | Aarambh Infinity",
      description:
        "Product, corporate, brand and event photography plus product videos, corporate films, promotional video, social content, motion graphics and editing.",
      heading: "Corporate Video & Photography Services",
      faqs: [
        {
          question: "What photography and video services are available?",
          answer:
            "The service includes product, corporate, brand and event photography plus product videos, corporate videos, promotional content, short-form social video, motion graphics and editing.",
        },
        {
          question: "Can you create content for social campaigns?",
          answer:
            "Yes. Short-form video, campaign creative and social-media-oriented production can be planned around the intended platform, audience and campaign objective.",
        },
      ],
    },
  },
  {
    slug: "email-customer-engagement",
    number: "06",
    group: "core",
    icon: "email",
    title: "Email & Customer Engagement",
    short: "Emails that keep leads warm and customers coming back.",
    description:
      "Campaigns and automated sequences that follow up with new leads and keep existing customers informed.",
    items: [
      "Email Marketing", "Newsletter Design", "Promotional Campaigns", "Lead Nurturing", "Email Automation",
      "Customer Segmentation", "Personalization", "A/B Testing", "Campaign Analytics", "Customer Updates",
      "Re-engagement Campaigns",
    ],
    image: unsplash("photo-1486312338219-ce68d2c6f44d"),
    seo: {
      title: "Email Marketing & Customer Engagement Services | Aarambh Infinity",
      description:
        "Email campaigns, newsletters, lead nurturing, automation, segmentation, personalization, A/B testing, analytics, customer updates and re-engagement.",
      heading: "Email Marketing & Customer Engagement Automation",
      faqs: [
        {
          question: "What can email automation handle?",
          answer:
            "Email automation can support lead nurturing, onboarding, follow-ups, customer updates, promotional sequences, re-engagement and other triggered communications based on customer actions or segments.",
        },
        {
          question: "How do you improve email campaign performance?",
          answer:
            "Performance can be improved through segmentation, personalization, A/B testing, clearer offers, better timing and measurement of clicks, conversions and downstream business outcomes.",
        },
      ],
    },
  },
  {
    slug: "ai-business-automation",
    number: "07",
    group: "growth",
    icon: "ai",
    title: "AI & Business Automation",
    short: "Chatbots, AI agents and automations that give your team time back.",
    description:
      "AI systems that take over repetitive tasks and respond to customers faster.",
    items: [
      "AI Chatbots", "AI Customer Support", "AI Sales Agents", "AI Assistants", "AI Lead Qualification",
      "AI Follow-ups", "AI Email Automation", "Document Processing", "Workflow Automation", "CRM Automation",
      "AI Reporting", "Internal AI Tools",
    ],
    image: unsplash("photo-1677442136019-21780ecad995"),
    seo: {
      title: "AI Automation, Chatbots & AI Agent Services | Aarambh Infinity",
      description:
        "AI chatbots, customer support, sales agents, assistants, lead qualification, follow-ups, document processing, CRM automation, reporting and internal AI tools.",
      heading: "AI Automation, Chatbots & AI Agents for Business",
      faqs: [
        {
          question: "What business processes can AI automate?",
          answer:
            "AI can assist with customer questions, lead qualification, follow-ups, email workflows, document processing, CRM updates, reporting and internal knowledge tasks when the process and safeguards are designed appropriately.",
        },
        {
          question: "Where should a business start with AI automation?",
          answer:
            "Start with repetitive, high-volume workflows that have clear inputs, outputs and human escalation points. Map the process first, then prioritize automation based on value, risk and integration feasibility.",
        },
      ],
    },
  },
  {
    slug: "whatsapp-conversational-commerce",
    number: "08",
    group: "growth",
    icon: "whatsapp",
    title: "WhatsApp & Conversational Commerce",
    short: "Sell to and support your customers on WhatsApp.",
    description: "Use WhatsApp to capture and qualify leads, book appointments, send order updates and follow up automatically.",
    items: [
      "WhatsApp Business API", "WhatsApp Automation", "WhatsApp Campaigns", "AI WhatsApp Agents", "Lead Capture",
      "Lead Qualification", "Automated Follow-ups", "Appointment Booking", "Customer Notifications", "Order Updates",
      "Customer Segmentation", "CRM Integration", "WhatsApp Analytics",
    ],
    image: unsplash("photo-1512428559087-560fa5ceab42"),
    seo: {
      title: "WhatsApp Business API & Automation Services | Aarambh Infinity",
      description:
        "WhatsApp Business API, automation, campaigns, AI agents, lead capture, qualification, follow-ups, booking, notifications, CRM integration and analytics.",
      heading: "WhatsApp Business API, Automation & Conversational Commerce",
      faqs: [
        {
          question: "What can WhatsApp automation do?",
          answer:
            "WhatsApp automation can capture and qualify leads, handle common questions, book appointments, send approved notifications, trigger follow-ups and synchronize conversations with CRM workflows.",
        },
        {
          question: "Do I need the WhatsApp Business API?",
          answer:
            "The right setup depends on message volume, team size, automation needs, integrations and use case. Businesses requiring structured multi-user workflows or advanced automation may need an API-based implementation.",
        },
      ],
    },
  },
  {
    slug: "business-software-platforms",
    number: "09",
    group: "growth",
    icon: "software",
    title: "Business Software & Custom Platforms",
    short: "Custom systems that fit the way your business works.",
    description:
      "Software that replaces manual processes and connects the different parts of your business, from sales to inventory.",
    items: [
      "CRM Systems", "Lead Management", "Dealer Management", "Customer Portals", "Employee Portals",
      "Order Management", "Inventory Systems", "Booking Systems", "Approval Systems", "Internal Dashboards",
      "Business Management Systems", "Third-party Integrations", "Payment Systems",
    ],
    image: unsplash("photo-1517694712202-14dd9538aa97"),
    seo: {
      title: "Custom Business Software, CRM & Platform Development | Aarambh Infinity",
      description:
        "Custom CRM, lead management, dealer systems, customer and employee portals, order and inventory systems, booking, approvals, dashboards, integrations and payments.",
      heading: "Custom Business Software, CRM & Platform Development",
      faqs: [
        {
          question: "When should a business build custom software?",
          answer:
            "Custom software is useful when spreadsheets or disconnected tools create repeated manual work, errors, poor visibility or process constraints that cannot be solved efficiently with an existing product.",
        },
        {
          question: "What systems can you build?",
          answer:
            "The service scope includes CRM, lead and dealer management, customer and employee portals, order and inventory systems, booking and approval systems, dashboards, integrations and payment workflows.",
        },
      ],
    },
  },
  {
    slug: "data-analytics-business-intelligence",
    number: "10",
    group: "growth",
    icon: "data",
    title: "Data, Analytics & Business Intelligence",
    short: "See how your business is performing without building reports by hand.",
    description: "Sales, marketing and customer data brought together into dashboards and automated reports that managers can act on.",
    items: [
      "Business Dashboards", "Sales Analytics", "Marketing Analytics", "Customer Analytics", "KPI Dashboards",
      "Automated Reports", "Data Integration", "Data Visualization", "Performance Monitoring", "Management Reporting",
    ],
    image: unsplash("photo-1551288049-bebda4e38f71"),
    seo: {
      title: "Business Intelligence, Dashboards & Analytics Services | Aarambh Infinity",
      description:
        "Business dashboards, sales analytics, marketing analytics, customer analytics, KPI reporting, automated reports, data integration and performance monitoring.",
      heading: "Business Intelligence, Dashboards & Analytics Services",
      faqs: [
        {
          question: "What can a business dashboard show?",
          answer:
            "A dashboard can combine sales, marketing, customer and operational data into KPIs and visual reports so managers can monitor performance without manually rebuilding reports.",
        },
        {
          question: "Can management reporting be automated?",
          answer:
            "Yes. Where source systems and data quality allow it, reporting can be automated through integrations, scheduled refreshes and dashboards designed around decision-making KPIs.",
        },
      ],
    },
  },
  {
    slug: "ai-digital-transformation",
    number: "11",
    group: "growth",
    icon: "transform",
    title: "AI & Digital Transformation",
    short: "Find out where AI and automation will help your business most.",
    description:
      "A review of how your business runs today that shows where automation and AI can bring measurable improvements.",
    items: [
      "AI Readiness Assessment", "AI Strategy", "Process Automation", "Workflow Digitization", "AI Knowledge Systems",
      "Internal AI Assistants", "Sales Automation", "Customer Service Automation", "Document Automation",
      "Business Process Optimization", "Digital Transformation Consulting",
    ],
    image: unsplash("photo-1485827404703-89b55fcc595e"),
    seo: {
      title: "AI Strategy & Digital Transformation Consulting | Aarambh Infinity",
      description:
        "AI readiness assessment, AI strategy, process automation, workflow digitization, knowledge systems, internal assistants, sales and service automation and process optimization.",
      heading: "AI Strategy & Digital Transformation Consulting",
      faqs: [
        {
          question: "What is an AI readiness assessment?",
          answer:
            "An AI readiness assessment reviews business processes, data, systems, repetitive work, integration constraints and risk to identify where AI or automation can create practical measurable value.",
        },
        {
          question: "What is the goal of digital transformation?",
          answer:
            "The goal is to improve how work is performed and measured by redesigning processes, connecting systems and applying automation or AI where it produces a clear operational or customer benefit.",
        },
      ],
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);