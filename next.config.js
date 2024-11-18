/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    publicSupabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    publicSupabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    cloudinaryAPIKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    cloudinaryAPISecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    geoAPIKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

// async redirects() {
//   return [
//     {
//       source: '/',
//       destination: '/',
//       permanent: true,
//     },
//   ];
// },
