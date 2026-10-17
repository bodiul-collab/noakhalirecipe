export interface SeoMetaOptions {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: "website" | "article";
  imageUrl?: string;
  authorName?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const DEFAULT_ORIGIN = "https://www.noakhalikitchen.com";

export function toAbsoluteUrl(url?: string): string {
  if (!url) return `${DEFAULT_ORIGIN}/icon.svg`;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${DEFAULT_ORIGIN}${url}`;
  return `${DEFAULT_ORIGIN}/${url}`;
}

export function updatePageSeo(options: SeoMetaOptions): () => void {
  if (typeof document === "undefined") {
    return () => {};
  }

  // Preserve initial values for cleanup
  const prevTitle = document.title;

  // Helper for <meta name="...">
  const setMetaByName = (name: string, content: string): { elem: HTMLMetaElement; prev: string | null; isNew: boolean } => {
    let elem = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    let isNew = false;
    let prev: string | null = null;
    if (!elem) {
      elem = document.createElement("meta");
      elem.setAttribute("name", name);
      document.head.appendChild(elem);
      isNew = true;
    } else {
      prev = elem.getAttribute("content");
    }
    elem.setAttribute("content", content);
    return { elem, prev, isNew };
  };

  // Helper for <meta property="...">
  const setMetaByProperty = (property: string, content: string): { elem: HTMLMetaElement; prev: string | null; isNew: boolean } => {
    let elem = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
    let isNew = false;
    let prev: string | null = null;
    if (!elem) {
      elem = document.createElement("meta");
      elem.setAttribute("property", property);
      document.head.appendChild(elem);
      isNew = true;
    } else {
      prev = elem.getAttribute("content");
    }
    elem.setAttribute("content", content);
    return { elem, prev, isNew };
  };

  // Helper for <link rel="...">
  const setLinkRel = (rel: string, href: string): { elem: HTMLLinkElement; prev: string | null; isNew: boolean } => {
    let elem = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    let isNew = false;
    let prev: string | null = null;
    if (!elem) {
      elem = document.createElement("link");
      elem.setAttribute("rel", rel);
      document.head.appendChild(elem);
      isNew = true;
    } else {
      prev = elem.getAttribute("href");
    }
    elem.setAttribute("href", href);
    return { elem, prev, isNew };
  };

  // 1. Update Title
  document.title = options.title;

  // 2. Canonical
  const canonicalRecord = setLinkRel("canonical", options.canonicalUrl);

  // 3. Meta description
  const descRecord = setMetaByName("description", options.description);

  // 4. OpenGraph tags
  const ogTitleRecord = setMetaByProperty("og:title", options.title);
  const ogDescRecord = setMetaByProperty("og:description", options.description);
  const ogUrlRecord = setMetaByProperty("og:url", options.canonicalUrl);
  const ogTypeRecord = setMetaByProperty("og:type", options.ogType || "article");

  const absImage = toAbsoluteUrl(options.imageUrl);
  const ogImageRecord = setMetaByProperty("og:image", absImage);

  // 5. Twitter Card tags
  const twCardRecord = setMetaByName("twitter:card", "summary_large_image");
  const twTitleRecord = setMetaByName("twitter:title", options.title);
  const twDescRecord = setMetaByName("twitter:description", options.description);
  const twImageRecord = setMetaByName("twitter:image", absImage);

  return () => {
    document.title = prevTitle;

    if (canonicalRecord.isNew) canonicalRecord.elem.remove();
    else if (canonicalRecord.prev !== null) canonicalRecord.elem.setAttribute("href", canonicalRecord.prev);

    if (descRecord.isNew) descRecord.elem.remove();
    else if (descRecord.prev !== null) descRecord.elem.setAttribute("content", descRecord.prev);

    if (ogTitleRecord.isNew) ogTitleRecord.elem.remove();
    else if (ogTitleRecord.prev !== null) ogTitleRecord.elem.setAttribute("content", ogTitleRecord.prev);

    if (ogDescRecord.isNew) ogDescRecord.elem.remove();
    else if (ogDescRecord.prev !== null) ogDescRecord.elem.setAttribute("content", ogDescRecord.prev);

    if (ogUrlRecord.isNew) ogUrlRecord.elem.remove();
    else if (ogUrlRecord.prev !== null) ogUrlRecord.elem.setAttribute("content", ogUrlRecord.prev);

    if (ogTypeRecord.isNew) ogTypeRecord.elem.remove();
    else if (ogTypeRecord.prev !== null) ogTypeRecord.elem.setAttribute("content", ogTypeRecord.prev);

    if (ogImageRecord.isNew) ogImageRecord.elem.remove();
    else if (ogImageRecord.prev !== null) ogImageRecord.elem.setAttribute("content", ogImageRecord.prev);

    if (twCardRecord.isNew) twCardRecord.elem.remove();
    else if (twCardRecord.prev !== null) twCardRecord.elem.setAttribute("content", twCardRecord.prev);

    if (twTitleRecord.isNew) twTitleRecord.elem.remove();
    else if (twTitleRecord.prev !== null) twTitleRecord.elem.setAttribute("content", twTitleRecord.prev);

    if (twDescRecord.isNew) twDescRecord.elem.remove();
    else if (twDescRecord.prev !== null) twDescRecord.elem.setAttribute("content", twDescRecord.prev);

    if (twImageRecord.isNew) twImageRecord.elem.remove();
    else if (twImageRecord.prev !== null) twImageRecord.elem.setAttribute("content", twImageRecord.prev);
  };
}
