export const getApiOrigin = () => {
  if (process.env.NEXT_PUBLIC_API_ORIGIN) return process.env.NEXT_PUBLIC_API_ORIGIN;
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:5001`;
  }
  return "http://localhost:5001";
};
