export const config = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
} as const;

export const getApiUrl = (path: string = ''): string => {
  const baseUrl = config.api.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};