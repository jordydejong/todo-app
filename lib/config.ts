export const config = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
} as const;

export const getApiUrl = (path: string = ''): string => {
  const baseUrl = config.api.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};