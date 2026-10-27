import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Share2, 
  Clock, 
  User, 
  ChevronRight 
} from 'lucide-react';
import SubpageHero from '@/components/layout/SubpageHero';
import blogPosts from '../../../../content/blog/posts.json';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p: any) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p: any) => p.slug === params.slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} | NHIT Campus Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostDetailPage({ params }: Props) {
  const post = blogPosts.find((p: any) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#212529]">
      <SubpageHero
        kicker={post.category}
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <article className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm space-y-8">
          
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5" />
                NHIT Editorial Team
              </span>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 font-bold text-gray-700 hover:text-[#ff3115] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>
          </div>

          {/* Featured Image */}
          <div className="relative h-72 md:h-96 w-full rounded-xl overflow-hidden border border-gray-200">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Article Body */}
          <div className="text-gray-800 text-sm md:text-base leading-relaxed space-y-6">
            {post.content.split('\n\n').map((paragraph: string, pIdx: number) => (
              <p key={pIdx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer Back Link */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> More Campus News
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#ff3115] hover:underline"
            >
              <span>Explore Admissions</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
}
