/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images:{
    domains: ["akm-img-a-in.tosshub.com"]
  }
}

module.exports = nextConfig
