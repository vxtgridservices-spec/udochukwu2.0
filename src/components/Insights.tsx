import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getBlogs, saveBlogComment } from '../utils/storage';
import { BlogPost } from '../types';
import {
  FileSearch,
  Filter,
  BarChart2,
  ThumbsUp,
  ArrowLeft,
  MessageCircle,
  Send,
} from 'lucide-react';

interface BlogProps {
  onNavigate: (page: string) => void;
  isHome?: boolean;
}

export default function Insights({ onNavigate, isHome }: BlogProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getBlogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);

  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentError, setCommentError] = useState('');

  const categoriesList = [
    'All',
    'Web Design',
    'Business Growth',
    'SEO',
    'Marketing',
    'Branding',
    'Systems',
    'Technology',
  ];

  const filteredBlogs = useMemo(() => {
    if (isHome) {
      return blogs.slice(0, 2);
    }
    return blogs.filter((post) => {
      const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [blogs, selectedCategory, searchQuery, isHome]);

  const featuredArticle = useMemo(() => blogs[0], [blogs]);

  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = blogs.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    setBlogs(updated);
    localStorage.setItem('vxt_blogs', JSON.stringify(updated));
    if (activeBlogPost && activeBlogPost.id === postId) {
      const refreshed = updated.find((p) => p.id === postId);
      if (refreshed) setActiveBlogPost(refreshed);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBlogPost || !commentName.trim() || !commentContent.trim()) {
      setCommentError('Please enter your name and comment before submitting.');
      return;
    }

    setCommentError('');
    const updatedBlogsList = saveBlogComment(activeBlogPost.id, {
      author: commentName.trim(),
      email: commentEmail.trim(),
      content: commentContent.trim(),
    });

    setBlogs(updatedBlogsList);
    const refreshed = updatedBlogsList.find((b) => b.id === activeBlogPost.id);
    if (refreshed) {
      setActiveBlogPost(refreshed);
    }

    setCommentName('');
    setCommentEmail('');
    setCommentContent('');
  };

  const handleOpenPost = (post: BlogPost) => {
    const updated = blogs.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p));
    setBlogs(updated);
    localStorage.setItem('vxt_blogs', JSON.stringify(updated));

    if (isHome) {
      onNavigate('blog');
      return;
    }

    const targetPost = updated.find((p) => p.id === post.id);
    if (targetPost) {
      setActiveBlogPost(targetPost);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#181d2c] text-white">
      <AnimatePresence mode="wait">
        {!activeBlogPost ? (
          <motion.div
            key="archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 1. HERO BAND (Slate-Cyan Wash — Matches Home Articles Section) */}
            <section className="bg-[#3b6e82] py-20 sm:py-24">
              <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
                  Udochukwu Latest Articles
                </h1>
                <div className="w-full max-w-2xl h-[1px] bg-white/80 my-6" />
                <p className="text-white/95 text-xs sm:text-sm tracking-[0.16em] font-mono leading-relaxed max-w-2xl uppercase">
                  PRACTICAL NOTES ON WEBSITE LOADING SPEED, SEARCH VISIBILITY, AND STRUCTURING CLEAR BUSINESS PORTALS.
                </p>
              </div>
            </section>

            {/* 2. FILTER & FEATURED ARCHIVE BAND (Deep Navy) */}
            <section className="bg-[#1b243b] py-16 sm:py-24">
              <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
                {!isHome && (
                  <div className="border border-white/25 bg-[#141a2b]/75 p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
                    <div className="relative w-full md:max-w-xs">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#181d2c] text-white pl-10 pr-4 py-2.5 text-xs font-mono border border-white/25 focus:border-white focus:outline-hidden"
                      />
                      <FileSearch className="absolute left-3 top-2.5 w-4 h-4 text-white/60" />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                      <Filter className="w-3.5 h-3.5 text-white/70 shrink-0 hidden sm:block mr-1" />
                      {categoriesList.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer border transition-colors ${
                            selectedCategory === cat
                              ? 'bg-white text-slate-950 border-white'
                              : 'bg-transparent text-white/80 border-white/20 hover:border-white hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Article */}
                {!isHome && searchQuery === '' && selectedCategory === 'All' && featuredArticle && (
                  <div
                    onClick={() => handleOpenPost(featuredArticle)}
                    className="bg-[#141a2b]/80 border border-white/25 overflow-hidden hover:border-white transition-colors cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
                  >
                    <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[280px] border-b lg:border-b-0 lg:border-r border-white/15">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 text-white/70 text-[11px] font-mono uppercase tracking-wider">
                          <span>Featured Essay</span>
                          <span aria-hidden="true">·</span>
                          <span>{featuredArticle.date}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-white">{featuredArticle.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{featuredArticle.readTime}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white mt-4 leading-tight">
                          {featuredArticle.title}
                        </h2>

                        <div className="w-32 h-[1px] bg-white/60 my-4" />

                        <p className="text-white/80 text-sm leading-relaxed font-sans">
                          {featuredArticle.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-5 border-t border-white/15 text-xs font-mono">
                        <span className="text-white font-semibold uppercase tracking-[0.16em]">
                          Read Article →
                        </span>

                        <div className="flex items-center gap-4 text-white/70 tabular-nums">
                          <span className="flex items-center gap-1.5">
                            <BarChart2 className="w-3.5 h-3.5" />
                            {featuredArticle.views} reads
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleLikePost(featuredArticle.id, e)}
                            className="hover:text-white transition-colors cursor-pointer"
                          >
                            {featuredArticle.likes} likes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Articles Grid */}
                {filteredBlogs.length === 0 ? (
                  <div className="border border-white/25 bg-[#141a2b]/65 p-12 text-center space-y-2">
                    <p className="text-white font-sans font-semibold text-base">
                      No matching articles found
                    </p>
                    <p className="text-white/70 text-xs font-mono uppercase tracking-wider">
                      Try resetting search keywords or selecting All categories.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((post) => (
                      <article
                        key={post.id}
                        id={`blog-card-${post.id}`}
                        onClick={() => handleOpenPost(post)}
                        className="cursor-pointer group flex flex-col justify-between bg-[#141a2b]/75 border border-white/25 hover:border-white transition-colors p-6"
                      >
                        <div>
                          <div className="relative h-44 overflow-hidden mb-5 border border-white/15 bg-[#101522]">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-white/70 text-[11px] font-mono uppercase tracking-wider">
                            <span className="text-white font-semibold">{post.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{post.date}</span>
                            <span aria-hidden="true">·</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h3 className="font-sans font-semibold text-white mt-3 text-lg leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-white/80 text-xs sm:text-sm mt-3 leading-relaxed font-sans line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/15 mt-6 flex items-center justify-between text-xs font-mono">
                          <span className="text-white font-semibold uppercase tracking-[0.14em]">
                            Read Article →
                          </span>

                          <span className="text-white/65 tabular-nums">
                            {post.views} · {post.likes} likes
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        ) : (
          /* ARTICLE READER BAND */
          <motion.section
            key="post-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#1b243b] py-16 sm:py-24 min-h-screen"
          >
            <div className="max-w-3xl mx-auto px-6 sm:px-10 space-y-10">
              <button
                type="button"
                onClick={() => {
                  setActiveBlogPost(null);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="border border-white/30 px-4 py-2 text-white/85 hover:text-white hover:border-white text-xs font-mono inline-flex items-center gap-2 transition-colors cursor-pointer uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Articles</span>
              </button>

              <div className="space-y-4">
                <span className="text-xs font-mono text-white/80 uppercase tracking-[0.18em] block">
                  {activeBlogPost.category}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight leading-tight">
                  {activeBlogPost.title}
                </h1>

                <div className="w-full max-w-xl h-[1px] bg-white/80 my-4" />

                <div className="flex flex-wrap items-center gap-4 text-white/75 text-xs font-mono tabular-nums uppercase tracking-wider">
                  <span>Posted: {activeBlogPost.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeBlogPost.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeBlogPost.views} reads</span>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={(e) => handleLikePost(activeBlogPost.id, e)}
                    className="flex items-center gap-1.5 text-white border border-white/30 px-3 py-1 hover:bg-white hover:text-slate-950 transition-colors cursor-pointer font-semibold"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
                    <span>{activeBlogPost.likes} upvotes</span>
                  </button>
                </div>
              </div>

              <div className="h-64 sm:h-96 border border-white/25 overflow-hidden bg-[#101522]">
                <img
                  src={activeBlogPost.image}
                  alt={activeBlogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-white/90 font-sans text-base leading-relaxed space-y-6">
                {activeBlogPost.content.split('\n\n').map((para, pIdx) => {
                  if (para.startsWith('## ')) {
                    return (
                      <h2
                        key={pIdx}
                        className="text-2xl font-sans font-semibold text-white mt-10 mb-3"
                      >
                        {para.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (para.startsWith('### ')) {
                    return (
                      <h3
                        key={pIdx}
                        className="text-xl font-sans font-semibold text-white mt-8 mb-2"
                      >
                        {para.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (para.startsWith('- ') || para.startsWith('1. ')) {
                    const items = para.split('\n');
                    const isOrdered = para.startsWith('1. ');
                    const Tag = isOrdered ? 'ol' : 'ul';
                    return (
                      <Tag
                        key={pIdx}
                        className="list-inside list-decimal space-y-2 pl-4 text-sm sm:text-base text-white/85"
                      >
                        {items.map((it, itIdx) => (
                          <li key={itIdx}>{it.replace(/^(\d+\.\s*|-\s*)/, '')}</li>
                        ))}
                      </Tag>
                    );
                  }
                  return (
                    <p key={pIdx} className="leading-relaxed whitespace-pre-line sm:text-lg">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* COMMENTS */}
              <div className="pt-10 border-t border-white/20 space-y-8">
                <h3 className="text-xl font-sans font-semibold text-white flex items-center gap-2.5">
                  <MessageCircle className="w-5 h-5" />
                  <span>Reader Feedback ({activeBlogPost.comments?.length || 0})</span>
                </h3>

                <div className="space-y-4">
                  {!activeBlogPost.comments || activeBlogPost.comments.length === 0 ? (
                    <p className="text-white/70 text-xs font-mono uppercase tracking-wider">
                      No comments posted yet. Share your thoughts below.
                    </p>
                  ) : (
                    activeBlogPost.comments.map((com) => (
                      <div
                        key={com.id}
                        className="bg-[#141a2b]/80 p-5 border border-white/20 flex gap-4"
                      >
                        <div className="h-10 w-10 bg-white text-slate-950 flex items-center justify-center shrink-0 text-xs font-mono font-bold uppercase">
                          {com.author.slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-white">{com.author}</span>
                            <span className="text-[11px] font-mono text-white/60">
                              {com.createdAt}
                            </span>
                          </div>
                          <p className="text-white/85 text-sm mt-2 leading-relaxed">
                            {com.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-[#141a2b]/80 p-6 sm:p-8 border border-white/25">
                  <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-[0.18em] mb-4">
                    Leave a Comment
                  </h4>

                  <form onSubmit={handlePostComment} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-white/80 uppercase block">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Segun Adesola"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          className="w-full bg-[#181d2c] text-white px-4 py-3 border border-white/25 text-xs font-mono focus:border-white focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-white/80 uppercase block">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          className="w-full bg-[#181d2c] text-white px-4 py-3 border border-white/25 text-xs font-mono focus:border-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-white/80 uppercase block">
                        Comment *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Write your thoughts..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="w-full bg-[#181d2c] text-white px-4 py-3 border border-white/25 text-xs font-mono focus:border-white focus:outline-hidden"
                      />
                    </div>

                    {commentError && (
                      <p className="text-xs font-mono text-rose-300">{commentError}</p>
                    )}

                    <button
                      type="submit"
                      id="submit-comment-button"
                      className="border border-white bg-white text-slate-950 hover:bg-transparent hover:text-white font-mono text-xs font-semibold uppercase tracking-[0.18em] px-6 py-3 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Post Comment</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
