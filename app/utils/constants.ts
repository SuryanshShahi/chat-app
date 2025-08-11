export const createUrl = (url: string, params?: object): string => {
  const queryString = params
    ? url?.includes("?")
      ? `&${stringifyParams(params)}`
      : `?${stringifyParams(params)}`
    : "";
  return `${url}${queryString}`;
};
export const removeQueryParams = (url: string, param: string) => {
  const newUrl = new URL(url);
  newUrl.searchParams.delete(param);
  return newUrl.toString();
};
export const stringifyParams = (params: object) => {
  return Object.entries(params)
    ?.filter(([, value]) => Boolean(value))
    ?.map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
    )
    ?.join("&");
};
export const decodeToken = (token: string) => {
  try {
    if (!token) return null;
    
    const payload = token.split(".")[1];
    if (!payload) return null;
    
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      // Server-side: use Buffer for Node.js environment
      try {
        const decoded = Buffer.from(payload, 'base64').toString('utf-8');
        return decoded ? JSON.parse(decoded) : null;
      } catch {
        // Fallback for environments without Buffer
        return null;
      }
    } else {
      // Client-side: use atob
      const decoded = window.atob(payload + '='.repeat((4 - payload.length % 4) % 4));
      return decoded ? JSON.parse(decoded) : null;
    }
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};
