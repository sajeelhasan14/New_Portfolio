import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 narrowed the default to `[75]`, and any `quality` prop outside
     * this list is silently coerced to the nearest allowed value. The project
     * screenshots are dense UI captures where 75 visibly mushes small text,
     * so 90 is allowed through for them.
     */
    qualities: [75, 90],
  },
};

export default nextConfig;
