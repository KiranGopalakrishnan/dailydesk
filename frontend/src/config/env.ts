const environment = process.env.NODE_ENV || 'development';

console.error(process.env.NEXT_PUBLIC_API_URL);
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
};
