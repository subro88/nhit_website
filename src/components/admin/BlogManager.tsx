'use client';

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import ImagePicker from './ImagePicker';

interface Post {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

const inputCls =
  'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#9E0B0F] bg-slate-50 focus:bg-white transition';

export default function BlogManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | 'new' | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [deleting, setDeleting] = useState<Post | null>(null);

  async function load() {
    const res = await fetch('/api/admin/blog');
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          News and stories shown on the public blog at /blog.
        </p>
        <button
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow"
        >
          <Plus className="w-4 h-4" /> Write New Post
        </button>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
            msg.ok
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          {msg.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {msg.text}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">Loading posts…</div>
        ) : posts.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            No posts yet. Write the first one!
          </div>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="px-5 py-4 flex flex-wrap items-start justify-between gap-3 hover:bg-slate-50/60 transition">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-violet-100 text-violet-700">
                    {p.category}
                  </span>
                  <span className="text-xs text-slate-400">{p.date}</span>
                </div>
                <div className="font-bold text-slate-900 text-sm mt-1.5">{p.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-2 max-w-3xl">
                  {p.excerpt}
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1.5">
                <a
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  title="View on site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setEditing(p)}
                  className="p-2 rounded-lg text-slate-400 hover:text-sky-700 hover:bg-sky-50"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleting(p)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <PostForm
          post={editing === 'new' ? null : editing}
          onClose={(saved, text) => {
            setEditing(null);
            if (saved) {
              setMsg({ ok: true, text });
              load();
            }
          }}
        />
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleting(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-slate-900">Delete this post?</h3>
            <p className="text-sm text-slate-500">“{deleting.title}” will be removed from the blog.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleting(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const res = await fetch(`/api/admin/blog/${deleting.id}`, {
                    method: 'DELETE',
                  });
                  setDeleting(null);
                  if (res.ok) {
                    setMsg({ ok: true, text: 'Post deleted.' });
                    load();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PostForm({
  post,
  onClose,
}: {
  post: Post | null;
  onClose: (saved: boolean, text: string) => void;
}) {
  const [title, setTitle] = useState(post?.title || '');
  const [category, setCategory] = useState(post?.category || 'Campus Updates');
  const [image, setImage] = useState(post?.image || '/images/campus-01.jpg');
  const [date, setDate] = useState(post?.date || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Title, excerpt and content are required.');
      return;
    }
    setBusy(true);
    const res = await fetch(post ? `/api/admin/blog/${post.id}` : '/api/admin/blog', {
      method: post ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, image, date, excerpt, content }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok) {
      onClose(true, post ? 'Post updated.' : 'Post published.');
    } else {
      setError(data.error || 'Could not save the post.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={() => onClose(false, '')} />
      <form onSubmit={submit} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-6 space-y-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">{post ? 'Edit Post' : 'Write New Post'}</h3>
          <button
            type="button"
            onClick={() => onClose(false, '')}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Title</span>
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          <ImagePicker label="Cover Photo" value={image} onChange={setImage} />
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Category</span>
              <input className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)} />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Date</span>
              <input className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} placeholder={post ? '' : 'Today (auto)'} />
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Excerpt
            </span>
            <textarea rows={3} className={inputCls} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Full Content
            </span>
            <textarea rows={10} className={inputCls} value={content} onChange={(e) => setContent(e.target.value)} />
            <span className="block text-[11px] text-slate-400">
              Blank lines create new paragraphs on the post page.
            </span>
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => onClose(false, '')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="px-6 py-2.5 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow disabled:opacity-60"
            >
              {busy ? 'Saving…' : post ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
