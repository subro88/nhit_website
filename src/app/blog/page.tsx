import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  Tag, 
  Sparkles 
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';
import blogPosts from '../../../content/blog/posts.json';

export const metadata = {
  title: 'Campus Blog & Academic Articles | NHIT Durgapur',
  description: 'Read the latest campus news, technical milestones, research MoUs, and placement records from The New Horizons Institute of Technology, Durgapur.',
};

export default function BlogIndexPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker="Campus Journalism & Academic News"
        title="NHIT Campus Blog"
        subtitle="Explore technical articles, MoU signings, placement milestones, and student innovation spotlights."
        breadcrumbs={[
          { label: 'Blog' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post: any) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#ff3115] shadow-xs">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-xs text-gray-300 flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#ff3115] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff3115] group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
