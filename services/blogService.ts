import { initialBlogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types';

const BLOG_STORAGE_KEY = 'cryptoax07_blog_posts';

// Helper to create a URL-friendly slug
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
};

export const getPosts = (): BlogPost[] => {
  let userAddedPosts: BlogPost[] = [];
  try {
    const storedPosts = localStorage.getItem(BLOG_STORAGE_KEY);
    if (storedPosts) {
      userAddedPosts = JSON.parse(storedPosts);
    }
  } catch (error) {
    console.error("Failed to parse blog posts from localStorage", error);
  }
  
  const allPosts = [...initialBlogPosts, ...userAddedPosts];

  // Simple deduplication based on id, user-added posts might overwrite initial ones if ids clash (unlikely with timestamp IDs)
  const uniquePosts = Array.from(new Map(allPosts.map(post => [post.id, post])).values());
  
  return uniquePosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const addPost = (postData: { title: string; summary: string; content: string; imageUrl: string }): BlogPost => {
  const storedPostsJSON = localStorage.getItem(BLOG_STORAGE_KEY);
  const storedPosts: BlogPost[] = storedPostsJSON ? JSON.parse(storedPostsJSON) : [];
  
  const newPost: BlogPost = {
    ...postData,
    id: new Date().toISOString(),
    slug: slugify(postData.title),
    publishedAt: new Date().toISOString(),
  };

  const updatedPosts = [...storedPosts, newPost];
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));

  return newPost;
};
