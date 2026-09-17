// import { unsplash } from "./utils";

// export const site = {
//   name: "Aarambh Infinity",
//   tagline: "Digital Systems for a Brighter Tomorrow.",
//   description:
//     "We build digital systems, AI automation and business solutions for a brighter tomorrow.",
//   contact: {
//     address: "Ahmedabad, Gujarat, India",
//     email: "hello@aarambhinfinity.com",
//     phone: "+91 98765 43210",
//     phoneHref: "tel:+919876543210",
//   },
//   socials: [
//     { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
//     { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
//     { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
//   ] as const,
// };

// export const nav = [
//   { label: "Home", href: "/" },
//   { label: "Services", href: "/services" },
//   { label: "Work", href: "/#work" },
//   { label: "About", href: "/#about" },
//   { label: "Insights", href: "/insights" },
//   { label: "Contact", href: "/contact" },
// ];

// export const stats = [
//   { value: 50, suffix: "+", label: "Projects Delivered" },
//   { value: 30, suffix: "+", label: "Happy Clients" },
//   { value: 5, suffix: "+", label: "Years of Experience" },
//   { value: 98, suffix: "%", label: "Client Satisfaction" },
// ];

// export const pillars = [
//   {
//     label: "Strategy",
//     title: "Understand Opportunities",
//     detail: "We map your goals, customers and bottlenecks before a single screen is designed.",
//     image: unsplash("photo-1464822759023-fed622ff2c3b", 900),
//   },
//   {
//     label: "Technology",
//     title: "Build Scalable Solutions",
//     detail: "Websites, apps and platforms engineered to grow with your business.",
//     image: unsplash("photo-1618005182384-a83a8bd57fbe", 900),
//   },
//   {
//     label: "People",
//     title: "Create Lasting Impact",
//     detail: "Tools your team actually enjoys using, and experiences customers come back to.",
//     image: unsplash("photo-1522071820081-009f0129c71c", 900),
//   },
//   {
//     label: "Growth",
//     title: "A Brighter Tomorrow",
//     detail: "Measure what works, automate what repeats, and scale with confidence.",
//     image: unsplash("photo-1451187580459-43490279c0fa", 900),
//   },
// ];

// export const process = [
//   { title: "Discover", text: "Understand your business, goals and challenges." },
//   { title: "Strategize", text: "Create a tailored plan for your growth." },
//   { title: "Build", text: "Design and develop with precision." },
//   { title: "Launch", text: "Go live with confidence." },
//   { title: "Optimize", text: "Measure, improve and scale." },
// ];

// export const work = [
//   {
//     title: "Real Estate Platform",
//     tag: "Website",
//     text: "Modern website for a growing real estate brand.",
//     image: unsplash("photo-1600585154340-be6161a56a0c", 900),
//     href: "/services/web-digital-experience",
//   },
//   {
//     title: "E-Commerce App",
//     tag: "Mobile App",
//     text: "A seamless shopping experience for a lifestyle brand.",
//     image: unsplash("photo-1556742049-0cfed4f6a45d", 900),
//     href: "/services/mobile-app-development",
//   },
//   {
//     title: "Sales CRM",
//     tag: "Software",
//     text: "Lead management system for a manufacturing company.",
//     image: unsplash("photo-1504868584819-f8e8b4b6d7e3", 900),
//     href: "/services/business-software-platforms",
//   },
//   {
//     title: "Product Branding",
//     tag: "Branding",
//     text: "Complete brand identity and creative campaign.",
//     image: unsplash("photo-1541643600914-78b084683601", 900),
//     href: "/services/branding-creative",
//   },
// ];

// /** Placeholder testimonials — replace with real client quotes before launch. */
// export const testimonials = [
//   {
//     quote:
//       "Aarambh Infinity not only delivered a great website but also helped us generate more leads through digital marketing. The team is professional, creative and result-oriented.",
//     name: "Rohit Mehta",
//     role: "Director, Mehta Industries",
//   },
//   {
//     quote:
//       "Our WhatsApp orders used to live in screenshots and notebooks. They set up automated order updates and a simple dashboard, and now the whole team works from one place.",
//     name: "Priya Shah",
//     role: "Founder, Kaira Home Décor",
//   },
//   {
//     quote:
//       "They replaced three spreadsheets with a custom dealer portal. Approvals that used to take two days now happen the same afternoon.",
//     name: "Karan Desai",
//     role: "Operations Head, Desai Logistics",
//   },
// ];


import { unsplash } from "./utils";

export const site = {
  name: "Aarambh Infinity",
  tagline: "Digital Systems for a Brighter Tomorrow.",
  description:
    "Websites, apps, AI automation and custom business software, built by a team in Ahmedabad.",
  contact: {
    address: "Ahmedabad, Gujarat, India",
    email: "hello@aarambhinfinity.com",
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  ] as const,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Clients" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export const pillars = [
  {
    label: "Strategy",
    title: "Understand the Problem First",
    detail: "We map your goals, customers and bottlenecks before a single screen is designed.",
    image: "/Strategy.jpg",
  },
  {
    label: "Technology",
    title: "Build to Scale",
    detail: "Websites, apps and platforms built to keep working as your business grows.",
    image: "/Technology.jpg",
  },
  {
    label: "People",
    title: "Make It Easy to Use",
    detail: "Tools your team likes using, and products your customers return to.",
    image: "/People.jpg",
  },
  {
    label: "Growth",
    title: "Keep Improving",
    detail: "Track what's working, automate the repetitive parts and put more behind what brings results.",
    image: "/Growth.jpg",
  },
];

export const process = [
  { title: "Discover", text: "We learn how your business works and what's getting in the way." },
  { title: "Strategize", text: "We plan the work around your specific goals." },
  { title: "Build", text: "We design it, then build it." },
  { title: "Launch", text: "Your website, app or system goes live." },
  { title: "Optimize", text: "We track how it performs and keep improving it." },
];

export const work = [
  {
    title: "Real Estate Platform",
    tag: "Website",
    text: "A new website for a growing real estate brand.",
    image: "/Realstate.jpg",
    href: "/services/web-digital-experience",
  },
  {
    title: "E-Commerce App",
    tag: "Mobile App",
    text: "A shopping app for a lifestyle brand.",
    image: "/mobileapp.jpg",
    href: "/services/mobile-app-development",
  },
  {
    title: "Sales CRM",
    tag: "Software",
    text: "Lead management system for a manufacturing company.",
    image: "/crm.jpg",
    href: "/services/business-software-platforms",
  },
  {
    title: "Product Branding",
    tag: "Branding",
    text: "Brand identity and campaign creative for a product.",
    image: "/branding.jpg",
    href: "/services/branding-creative",
  },
];

/** Placeholder testimonials — replace with real client quotes before launch. */
export const testimonials = [
  {
    quote:
      "Aarambh Infinity not only delivered a great website but also helped us generate more leads through digital marketing. The team is professional, creative and result-oriented.",
    name: "Rohit Mehta",
    role: "Director, Mehta Industries",
  },
  {
    quote:
      "Our WhatsApp orders used to live in screenshots and notebooks. They set up automated order updates and a simple dashboard, and now the whole team works from one place.",
    name: "Priya Shah",
    role: "Founder, Kaira Home Décor",
  },
  {
    quote:
      "They replaced three spreadsheets with a custom dealer portal. Approvals that used to take two days now happen the same afternoon.",
    name: "Karan Desai",
    role: "Operations Head, Desai Logistics",
  },
];