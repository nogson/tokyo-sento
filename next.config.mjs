/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "@/assets/scss/_mantine.scss";`,
  },
};

export default nextConfig;
