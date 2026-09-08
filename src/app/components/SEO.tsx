import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object | object[];
}

const DEFAULT_DOMAIN = "https://storeasteya.vercel.app";
const DEFAULT_OG_IMAGE = "https://storeasteya.vercel.app/og-image.jpg";

export function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper function to set or create meta tag
    const setMetaTag = (nameAttr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    setMetaTag("name", "robots", "index, follow");

    // 3. Canonical Tag
    const fullCanonical = canonicalUrl || (window.location.origin + window.location.pathname);
    let canonicalEl = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", fullCanonical);

    // 4. OpenGraph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", fullCanonical);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", "ASTEYA Anime Apparel");

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    const existingJsonLd = document.getElementById("seo-jsonld");
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, jsonLd]);

  return null;
}
