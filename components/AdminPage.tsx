import React, { useState, useRef } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { Page } from '../types';
import { addPost } from '../services/blogService';
import { useLanguage } from '../hooks/useLanguage';

interface AdminPageProps {
  onNavigatePage: (page: Page) => void;
}

const ADMIN_PASSWORD = 'cryptoax07';

const AdminPage: React.FC<AdminPageProps> = ({ onNavigatePage }) => {
    const { t } = useLanguage();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isPublished, setIsPublished] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError(t('adminPage.authError'));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitPost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !summary || !content || !image) {
            setError('All fields are required.');
            return;
        }
        addPost({ title, summary, content, imageUrl: image });
        setIsPublished(true);
        // Reset form
        setTitle('');
        setSummary('');
        setContent('');
        setImage(null);
        if(fileInputRef.current) fileInputRef.current.value = '';
    };

    const pageStyle = {
      backgroundImage: `linear-gradient(rgba(16, 20, 31, 0.95), rgba(16, 20, 31, 0.95)), url('https://static.wixstatic.com/media/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png/v1/fill/w_1156,h_420,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png')`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '100vh'
    };

    return (
        <div style={pageStyle} className="text-brand-text font-sans flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-brand-surface p-6 md:p-8">
                <button onClick={() => onNavigatePage('intro')} className="text-sm text-brand-primary hover:underline mb-4">&larr; Back to Home</button>
                <h1 className="text-3xl font-bold text-center text-white mb-6">{t('adminPage.title')}</h1>

                {!isAuthenticated ? (
                    <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto">
                        <h2 className="text-xl font-semibold text-center">{t('adminPage.authTitle')}</h2>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
                                placeholder="Password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <Button type="submit" className="w-full">{t('adminPage.authButton')}</Button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitPost} className="space-y-4">
                         <h2 className="text-xl font-semibold text-center">{t('adminPage.newPostTitle')}</h2>
                         {isPublished && <p className="text-center p-3 rounded-lg bg-brand-secondary/20 text-brand-secondary">{t('adminPage.successMessage')}</p>}
                         <div>
                            <label className="block text-sm font-medium mb-1">{t('adminPage.fieldTitle')}</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2" required />
                         </div>
                         <div>
                            <label className="block text-sm font-medium mb-1">{t('adminPage.fieldSummary')}</label>
                            <textarea value={summary} onChange={e => setSummary(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 h-20" required />
                         </div>
                         <div>
                            <label className="block text-sm font-medium mb-1">{t('adminPage.fieldContent')}</label>
                            <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 h-40" required />
                         </div>
                         <div>
                             <label className="block text-sm font-medium mb-1">{t('adminPage.fieldImage')}</label>
                             <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm" required />
                         </div>
                         {image && (
                            <div>
                                <p className="text-sm font-medium mb-1">{t('adminPage.imagePreview')}</p>
                                <img src={image} alt="Preview" className="max-h-40 rounded-lg" />
                            </div>
                         )}
                         <div className="flex gap-4 pt-4">
                            <Button type="submit" className="w-full">{t('adminPage.submitButton')}</Button>
                            <Button onClick={() => onNavigatePage('blog')} variant="secondary" className="w-full" type="button">{t('adminPage.backToBlog')}</Button>
                         </div>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default AdminPage;
