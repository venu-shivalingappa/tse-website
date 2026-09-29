export const DEFAULT_SITE_URL = "https://www.techsolveengine.com";

export function siteUrl(path = "/"): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
  return path === "/" ? base : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
