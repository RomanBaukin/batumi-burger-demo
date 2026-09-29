import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://batumi-burger-demo.vercel.app', changeFrequency: 'monthly', priority: 1 }];
}
