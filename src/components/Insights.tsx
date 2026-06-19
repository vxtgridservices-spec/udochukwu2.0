import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getBlogs, saveBlogComment } from '../utils/storage';
import { BlogPost, BlogComment } from '../types';
import { Search, Flame, ThumbsUp, Eye, Calendar, MessageSquare, CornerDownRight, User, Send, ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';

interface BlogProps {
  onNavigate: (page: string) => void;
  isHome?: boolean;
}

export default function Insights({ onNavigate, isHome }: BlogProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getBlogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);

  // New comment fields
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');

  // Categories list
  const categoriesList = ['All', 'Web Design', 'Business Growth', 'SEO', 'Marketing', 'Branding', 'AI', 'Technology'];

  // Filtered post calculation
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

  // Featured article (always grab the first blog item)
  const featuredArticle = useMemo(() => {
    return blogs[0];
  }, [blogs]);

  // Handler for likes
  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = blogs.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setBlogs(updated);
    localStorage.setItem('vxt_blogs', JSON.stringify(updated));
  };

  // Handler for submitting a comment
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBlogPost || !commentName || !commentContent) {
      alert('Please fill out your name and write a comment.');
      return;
    }

    const updatedBlogsList = saveBlogComment(activeBlogPost.id, {
      author: commentName,
      email: commentEmail,
      content: commentContent
    });

    setBlogs(updatedBlogsList);
    // Refresh currently open blog active parameters
    const refreshed = updatedBlogsList.find(b => b.id === activeBlogPost.id);
    if (refreshed) {
      setActiveBlogPost(refreshed);
    }

    // Reset fields
    setCommentName('');
    setCommentContent('');
  };

  const handleOpenPost = (post: BlogPost) => {
    // Increment view count beautifully
    const updated = blogs.map(p => {
      if (p.id === post.id) {
        return { ...p, views: p.views + 1 };
      }
      return p;
    });
    setBlogs(updated);
    localStorage.setItem('vxt_blogs', JSON.stringify(updated));
    
    if (isHome) {
      onNavigate('blog');
      return;
    }

    const targetPost = updated.find(p => p.id === post.id);
    if (targetPost) {
      setActiveBlogPost(targetPost);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`transition-colors duration-300 ${isHome ? 'py-24 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800' : 'py-12 md:py-20 bg-slate-50 dark:bg-slate-900'}`}>
      <div className={`${isHome ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        
        <AnimatePresence mode="wait">
          {!activeBlogPost ? (
            /* BLOG ARCHIVE SHEET */
            <motion.div
              key="archive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`space-y-16 ${isHome ? 'w-full px-6 sm:px-8 lg:px-12' : ''}`}
            >
              
              {/* Intro Title */}
              <div className={isHome ? "text-center sm:text-left border-b-2 border-slate-800 pb-6 text-slate-900 dark:text-white" : "text-center max-w-3xl mx-auto"}>
                <span className={`text-xs font-mono uppercase tracking-widest font-bold ${isHome ? 'text-blue-600 dark:text-blue-400' : 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-3 py-1.5 rounded-full'}`}>
                  {isHome ? 'LATEST ARTICLES' : 'HIGH-TRACTION ARTICLES'}
                </span>
                <h1 className={`font-sans font-bold tracking-tight uppercase ${isHome ? 'text-3xl sm:text-5xl mt-2' : 'text-3xl sm:text-4xl lg:text-5xl font-serif mt-4 font-medium'}`}>
                  Business Growth & Digital Insights
                </h1>
                {!isHome && (
                  <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
                    Deep-dive guides written for African business builders to expand market share, master performance, and capture premium digital opportunities.
                  </p>
                )}
              </div>

              {/* Advanced filter & search dock */}
              {!isHome && (
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
                  
                  {/* Search Bar */}
                  <div className="relative w-full md:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search masterclasses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white pl-10 pr-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-850 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  </div>

                  {/* Categories Scrollbar */}
                  <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
                    {categoriesList.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight whitespace-nowrap cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                </div>
              )}

              {/* FEATURED ARTICLES FLAGSHIP PANEL */}
              {!isHome && searchQuery === '' && selectedCategory === 'All' && featuredArticle && (
                <div 
                  onClick={() => handleOpenPost(featuredArticle)}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/60 dark:border-slate-750/50 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
                >
                  <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full min-h-[280px]">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-mono tracking-widest px-3 py-1 rounded-sm shadow-md uppercase font-bold flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 animate-pulse" />
                      FLAGSHIP POST
                    </div>
                  </div>

                  <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
                        <span>{featuredArticle.date}</span>
                        <span>•</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">{featuredArticle.category}</span>
                        <span>•</span>
                        <span>{featuredArticle.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-slate-900 dark:text-white mt-4 font-normal leading-tight group-hover:text-blue-600 transition-colors">
                        {featuredArticle.title}
                      </h3>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed font-sans font-light">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-705">
                      {/* Read CTA */}
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                        Read Complete Analysis
                        <CornerDownRight className="w-4 h-4 text-blue-600 animate-bounce" style={{ animationDuration: '3s' }} />
                      </span>

                      {/* Stat summary */}
                      <div className="flex gap-4 text-slate-400 text-xs font-mono">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {featuredArticle.views}
                        </span>
                        <span 
                          onClick={(e) => handleLikePost(featuredArticle.id, e)}
                          className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {featuredArticle.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* POSTS GRID LIST */}
              <div>
                {filteredBlogs.length === 0 ? (
                  <div className="bg-transparent p-12 text-center border border-slate-300 dark:border-slate-800">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-900 dark:text-white font-medium text-base">No matching diagnostic articles found</p>
                    <p className="text-slate-500 text-xs mt-1">Try resetting search parameters or browse all categories.</p>
                  </div>
                ) : (
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${isHome ? 'lg:grid-cols-2 gap-8 lg:mx-auto max-w-5xl' : 'lg:grid-cols-3 gap-8'}`}>
                    {filteredBlogs.map((post) => (
                      <div
                        key={post.id}
                        id={`blog-card-${post.id}`}
                        onClick={() => handleOpenPost(post)}
                        className={`cursor-pointer group flex flex-col justify-between ${isHome ? 'bg-transparent' : 'bg-transparent border border-slate-300 dark:border-slate-800 p-6'}`}
                      >
                        <div>
                          {/* Image and categories badge wrapper */}
                          <div className={`relative ${isHome ? 'h-64 sm:h-80 w-full mb-6 filter grayscale group-hover:grayscale-0 transition-all' : 'h-48 overflow-hidden mb-6'}`}>
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className={`w-full h-full object-cover ${isHome ? '' : 'group-hover:scale-105 transition-transform duration-500'}`}
                              referrerPolicy="no-referrer"
                            />
                            {!isHome && (
                              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-sm shadow-md uppercase">
                                {post.category}
                              </div>
                            )}
                          </div>
                          
                          {/* Content summary */}
                          <div className={`${isHome ? '' : ''}`}>
                            {isHome && (
                              <div className="mb-4">
                                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">{post.category}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2.5 text-slate-400 text-[10px] sm:text-xs font-mono uppercase font-semibold">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>

                            <h3 className={`font-sans font-bold text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 transition-colors uppercase ${isHome ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl font-serif font-semibold'}`}>
                              {post.title}
                            </h3>

                            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-sans line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className={`${isHome ? 'mt-8 block' : 'pt-6 border-t border-slate-300 dark:border-slate-800 mt-6'}`}>
                          <div className="flex items-center justify-between pt-4">
                            <span className="text-blue-600 dark:text-blue-400 font-bold font-mono tracking-widest uppercase text-[10px] sm:text-xs flex items-center gap-1.5 transition-colors">
                              READ ANALYSIS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>

                            <div className="flex gap-3 text-slate-400 text-xs font-mono flex-shrink-0">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.views}
                              </span>
                              <span 
                                onClick={(e) => handleLikePost(post.id, e)}
                                className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                              >
                                <ThumbsUp className="w-3 h-3" />
                                {post.likes}
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
                
                {isHome && (
                  <div className="mt-16 border-t-2 border-slate-800 pt-8 flex justify-center sm:justify-end">
                    <button
                      onClick={() => onNavigate('blog')}
                      className="border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-mono uppercase tracking-[0.2em] px-8 py-5 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors flex items-center justify-center gap-4 cursor-pointer font-bold text-sm w-full sm:w-auto"
                    >
                      VIEW ALL ARTICLES <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          ) : (
            /* BLOG ACTIVE READ SCREEN */
            <motion.div
              key="post-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto space-y-12"
            >
              
              {/* Back to list */}
              <button
                onClick={() => {
                  setActiveBlogPost(null);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                BACK TO DIAGNOSTIC PAPERS
              </button>

              {/* Cover Header */}
              <div className="space-y-4">
                <span className="text-xs font-mono bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {activeBlogPost.category}
                </span>
                
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white font-medium tracking-tight leading-tight">
                  {activeBlogPost.title}
                </h1>

                {/* Logistics */}
                <div className="flex items-center gap-4 text-slate-400 text-xs font-mono pt-2 border-b border-slate-205 dark:border-slate-800 pb-4">
                  <span>Posted: {activeBlogPost.date}</span>
                  <span>•</span>
                  <span>{activeBlogPost.readTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{activeBlogPost.views} views</span>
                  <span>•</span>
                  <button 
                    onClick={(e) => handleLikePost(activeBlogPost.id, e)}
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer font-bold"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
                    <span>{activeBlogPost.likes} upvotes</span>
                  </button>
                </div>
              </div>

              {/* Main Banner Image */}
              <div className="h-64 sm:h-96 rounded-3xl overflow-hidden shadow-md">
                <img 
                  src={activeBlogPost.image} 
                  alt={activeBlogPost.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* ARTICLE MARKDOWN-LIKE CONTENT BODY */}
              <div className="prose dark:prose-invert prose-blue max-w-none text-slate-700 dark:text-slate-300 font-sans text-base leading-relaxed space-y-6">
                {activeBlogPost.content.split('\n\n').map((para, pIdx) => {
                  if (para.startsWith('## ')) {
                    return <h2 key={pIdx} className="text-2xl font-serif font-medium text-slate-900 dark:text-white mt-10 mb-4">{para.replace('## ', '')}</h2>;
                  }
                  if (para.startsWith('### ')) {
                    return <h3 key={pIdx} className="text-xl font-serif font-semibold text-slate-900 dark:text-white mt-8 mb-3">{para.replace('### ', '')}</h3>;
                  }
                  if (para.startsWith('- ') || para.startsWith('1. ')) {
                    const items = para.split('\n');
                    const isOrdered = para.startsWith('1. ');
                    const Tag = isOrdered ? 'ol' : 'ul';
                    return (
                      <Tag key={pIdx} className="list-inside list-decimal space-y-2 pl-4 text-sm sm:text-base">
                        {items.map((it, itIdx) => (
                          <li key={itIdx}>
                            {it.replace(/^(\d+\.\s*|-\s*)/, '')}
                          </li>
                        ))}
                      </Tag>
                    );
                  }
                  return <p key={pIdx} className="leading-relaxed whitespace-pre-line sm:text-lg font-light">{para}</p>;
                })}
              </div>

              {/* COMMENTS BLOCK SYSTEM */}
              <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-8">
                
                <h3 className="text-lg sm:text-xl font-serif font-medium text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Reader Feedback ({activeBlogPost.comments?.length || 0})
                </h3>

                {/* Composed comments list */}
                <div className="space-y-4">
                  {!activeBlogPost.comments || activeBlogPost.comments.length === 0 ? (
                    <p className="text-slate-400 text-xs italic">No comments posted yet. Shape the conversation below!</p>
                  ) : (
                    activeBlogPost.comments.map((com) => (
                      <div 
                        key={com.id}
                        className="bg-slate-100 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 flex gap-4"
                      >
                        <div className="h-10 w-10 bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full flex items-center justify-center shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{com.author}</span>
                            <span className="text-[10px] font-mono text-slate-400">{com.createdAt}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                            {com.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Editor form */}
                <div className="bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-205 dark:border-slate-800/80">
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">LEAVE A COMMENT</h4>
                  
                  <form onSubmit={handlePostComment} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400">NAME *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Segun Adesola"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-400">WORK EMAIL (PRIVATE)</label>
                        <input
                          type="email"
                          placeholder="segun@realty.ng"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                        />
                      </div>

                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">COMMENT *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Write your diagnostic review or constructive commentary..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      id="submit-comment-button"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Post Feedback</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                  </form>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
