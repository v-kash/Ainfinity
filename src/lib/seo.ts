import { site } from "./site";

export const siteUrl = "https://aarambhgrow.tech";

/** Absolute URL for a site path, e.g. "/services" -> "https://aarambhgrow.tech/services" */
export const absoluteUrl = (path = "/") => (path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`);

export const organizationId = `${siteUrl}/#organization`;

/** Site-wide Organization + WebSite graph. Page schemas point at the organization by its @id. */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: absoluteUrl(),
      email: site.contact.email,
      telephone: "+91-9998715799",
      address: {
        "@type": "PostalAddress",
        streetAddress: "813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380060",
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: "India" },
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: absoluteUrl(),
      name: site.name,
      publisher: { "@id": organizationId },
      inLanguage: "en-IN",
    },
  ],
};
