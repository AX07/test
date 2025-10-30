
import React, { useState, useEffect } from 'react';
import type { BlogPost, Page } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { useLanguage } from '../hooks/useLanguage';
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost } from '../services/blogService';

interface AdminPageProps {
  onNavigatePage: (page: Page) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onNavigatePage }) => {
    const { t } = useLanguage();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isEditing, setIsEditing] = useState<BlogPost | null>(null);
    const [showForm, setShowForm] = useState(false);
    
    // Form state
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setPosts(getBlogPosts());
    }, []);

    const resetForm = () => {
        setTitle('');
        setSlug('');
        setSummary('');
        setContent('');
        setImageUrl('');
        setIsEditing(null);
        setShowForm(false);
    };

    const handleEdit = (post: BlogPost) => {
        setIsEditing(post);
        setTitle(post.title);
        setSlug(post.slug);
        setSummary(post.summary);
        setContent(post.content);
        setImageUrl(post.imageUrl);
        setShowForm(true);
        window.scrollTo(0, 0);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deleteBlogPost(id);
            setPosts(getBlogPosts());
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            updateBlogPost({ ...isEditing, title, slug, summary, content, imageUrl });
        } else {
            addBlogPost({ title, slug, summary, content, imageUrl });
        }
        setPosts(getBlogPosts());
        resetForm();
    };

    return (
        <div className="text-brand-text font-sans selection:bg-brand-primary/20 app-background min-h-screen">
             <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50">
                 <div className="container mx-auto px-4 flex justify-between items-center py-3">
                    <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                    <Button onClick={() => onNavigatePage('intro')}>&larr; Back to Site</Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Blog Posts</h2>
                    {!showForm && <Button onClick={() => setShowForm(true)}>+ New Post</Button>}
                </div>

                {showForm && (
                    <Card className="p-6 mb-8 bg-brand-surface/80">
                        <h3 className="text-lg font-bold mb-4">{isEditing ? 'Edit Post' : 'Create New Post'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-brand-bg p-2 rounded-md border border-gray-600"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Slug (e.g., "my-first-post")</label>
                                <input type="text" value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} required className="w-full bg-brand-bg p-2 rounded-md border border-gray-600"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium mb-1">Summary</label>
                                <textarea value={summary} onChange={e => setSummary(e.target.value)} required className="w-full bg-brand-bg p-2 rounded-md border border-gray-600 h-24"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium mb-1">Content (use \\n\\n for paragraphs)</label>
                                <textarea value={content} onChange={e => setContent(e.target.value)} required className="w-full bg-brand-bg p-2 rounded-md border border-gray-600 h-48"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full bg-brand-bg p-2 rounded-md border border-gray-600"/>
                            </div>
                            <div className="flex gap-4">
                                <Button type="submit" variant="secondary">{isEditing ? 'Update Post' : 'Create Post'}</Button>
                                <Button onClick={resetForm} variant="accent" className="bg-gray-600 hover:bg-gray-500">Cancel</Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="space-y-4">
                    {posts.map(post => (
                        <Card key={post.id} className="p-4 flex justify-between items-center bg-brand-surface">
                            <div>
                                <h4 className="font-bold text-white">{post.title}</h4>
                                <p className="text-xs text-gray-400">{post.slug}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={() => handleEdit(post)} className="text-sm py-1 px-3">Edit</Button>
                                <Button onClick={() => handleDelete(post.id)} variant="accent" className="bg-red-600 hover:bg-red-500 text-sm py-1 px-3">Delete</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
