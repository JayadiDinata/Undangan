/** @type {import('next').NextConfig} */
const isStatic = process.env.BUILD_STATIC === 'true'

const nextConfig = {
  output: isStatic ? 'export' : undefined,
  distDir: isStatic ? 'undangan' : '.next',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
