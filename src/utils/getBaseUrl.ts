export function getBaseUrl() {
  const env = process.env.NODE_ENV

  if (env === 'development') return 'http://localhost:3000'
  return 'https://fondart-app.vercel.app'
}