
import { initialBlogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types';

const BLOG_STORAGE_KEY = 'cryptoax07_blog_posts';

// Initialize storage with initial posts if it's empty
const initializeStorage = () => {
    if (!localStorage.getItem(BLOG_STORAGE_KEY)) {
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(initialBlogPosts));
    }
};

initializeStorage();

export const getBlogPosts = (): BlogPost[] => {
    try {
        const postsJson = localStorage.getItem(BLOG_STORAGE_KEY);
        if (!postsJson) {
            return [];
        }
        const posts = JSON.parse(postsJson) as BlogPost[];
        // Sort by date, newest first
        return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } catch (error) {
        console.error("Error fetching blog posts from localStorage:", error);
        return [];
    }
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    const posts = getBlogPosts();
    return posts.find(post => post.slug === slug);
};

export const addBlogPost = (postData: Omit<BlogPost, 'id' | 'publishedAt'>): BlogPost => {
    const posts = getBlogPosts();
    const newPost: BlogPost = {
        ...postData,
        id: new Date().getTime().toString(),
        publishedAt: new Date().toISOString(),
    };
    const updatedPosts = [newPost, ...posts];
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));
    return newPost;
};

export const updateBlogPost = (updatedPost: BlogPost): BlogPost | undefined => {
    const posts = getBlogPosts();
    const postIndex = posts.findIndex(p => p.id === updatedPost.id);
    if (postIndex === -1) {
        return undefined;
    }
    posts[postIndex] = updatedPost;
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    return updatedPost;
};

export const deleteBlogPost = (id: string): boolean => {
    const posts = getBlogPosts();
    const updatedPosts = posts.filter(p => p.id !== id);
    if (posts.length === updatedPosts.length) {
        return false; // Post not found
    }
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));
    return true;
};
