export function removeSubdomain(url: string) {
  const isVercelDomain = url.includes("vercel.app");

  if (isVercelDomain) {
    return { models: { onlyDomain: url } };
  }

  const parts = url.split(".");
  const onlyDomain = parts.length > 2 ? "." + parts.slice(-2).join(".") : url;
  return { models: { onlyDomain } };
}
