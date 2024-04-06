/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "@/common/scss/_mantine.scss";`,
  },
};

export default nextConfig;
