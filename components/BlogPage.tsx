import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/blogService';
import type { BlogPost, Page } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Footer from './Footer';
import { useLanguage } from '../hooks/useLanguage';
import { MenuIcon, XMarkIcon, PhoneIcon } from './icons/Icons';

interface BlogPageProps {
  onStart: () => void;
  onNavigatePage: (page: Page) => void;
  onOpenBookingModal: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onStart, onNavigatePage, onOpenBookingModal }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        setPosts(getPosts());
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedPost]);

    const pageStyle = {
      backgroundImage: `linear-gradient(rgba(16, 20, 31, 0.95), rgba(16, 20, 31, 0.95)), url('https://static.wixstatic.com/media/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png/v1/fill/w_1156,h_420,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png')`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
    };

    return (
        <div style={pageStyle} className="text-brand-text font-sans selection:bg-brand-primary/20">
             <header className={`bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50 transition-all duration-300`}>
                <div className={`container mx-auto px-4 flex justify-between items-center transition-all duration-300 relative ${isScrolled ? 'py-1' : 'py-3'}`}>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigatePage('intro'); }} className="flex items-center">
                        <img src="https://static.wixstatic.com/media/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png/v1/fill/w_958,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png" alt="CryptoAX07 Logo" className={`w-auto transition-all duration-300 ${isScrolled ? 'h-20' : 'h-28'}`} />
                    </a>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            <Button onClick={onOpenBookingModal} className="transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">{t('bookACall')}</Button>
                            <div className="relative">
                                <button onClick={onStart} className="font-bold py-2 px-4 rounded-lg transition-all duration-200 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange">{t('startLearning')}</button>
                                <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse-glow-orange z-10 whitespace-nowrap">{t('earnFiveUsd')}</div>
                            </div>
                        </div>
                        <div className="relative"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-white hover:bg-brand-surface">{isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}</button></div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:absolute md:top-full md:right-0 md:container md:mx-auto md:px-4 md:flex md:justify-end">
                        <div className="animate-fade-in bg-brand-surface/95 backdrop-blur-sm border-t md:border border-gray-700/50 md:mt-2 md:w-64 md:rounded-lg shadow-lg">
                            <nav className="container mx-auto px-4 py-4 flex flex-col items-center md:items-start md:p-4 gap-4">
                                <button onClick={() => { onNavigatePage('intro'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">{t('home')}</button>
                                <button onClick={() => { onNavigatePage('about'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">{t('about')}</button>
                                <button onClick={() => { onNavigatePage('blog'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">{t('blog')}</button>
                                <button onClick={() => { onNavigatePage('resources'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">{t('resources')}</button>
                                <button onClick={() => { onStart(); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">{t('startLearning')}</button>
                                <button onClick={() => { onOpenBookingModal(); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">{t('bookACall')}</button>
                                <div className="w-full pt-4 border-t border-gray-700/50 mt-2">
                                    <div className="flex items-center gap-1 p-1 rounded-lg bg-brand-bg justify-center max-w-[120px] mx-auto md:mx-0"><button className={`flex-1 text-center px-3 py-1 text-sm font-bold rounded-md transition-colors ${language === 'en' ? 'bg-brand-primary text-brand-bg' : 'text-brand-text-secondary hover:bg-brand-surface'}`} onClick={() => setLanguage('en')}>EN</button><button className={`flex-1 text-center px-3 py-1 text-sm font-bold rounded-md transition-colors ${language === 'es' ? 'bg-brand-primary text-brand-bg' : 'text-brand-text-secondary hover:bg-brand-surface'}`} onClick={() => setLanguage('es')}>ES</button></div>
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </header>
            
            <main className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">{t('blogPage.title')}</h1>
                    <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">{t('blogPage.subtitle')}</p>
                </div>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <Card key={post.id} className="bg-brand-surface flex flex-col group overflow-hidden">
                                <img src={post.imageUrl} alt={post.title} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">{post.title}</h3>
                                    <p className="text-sm text-brand-text-secondary mb-4 flex-grow">{post.summary}</p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <button onClick={() => setSelectedPost(post)} className="font-semibold text-brand-primary hover:underline text-sm">{t('blogPage.readMore')}</button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-brand-text-secondary">{t('blogPage.noPosts')}</p>
                )}
            </main>

            <Footer onStart={onStart} onNavigatePage={onNavigatePage} onOpenBookingModal={onOpenBookingModal} />

            {selectedPost && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-fade-in flex justify-center p-4" onClick={() => setSelectedPost(null)}>
                    <Card className="w-full max-w-4xl bg-brand-surface animate-pop-in flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="relative h-64 md:h-80 w-full">
                            <img src={selectedPost.imageUrl} alt={selectedPost.title} className="absolute inset-0 w-full h-full object-cover rounded-t-xl" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent"></div>
                            <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black"><XMarkIcon className="h-6 w-6" /></button>
                        </div>
                        <div className="p-6 md:p-8 flex-grow overflow-y-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedPost.title}</h2>
                            <p className="text-sm text-gray-500 mb-6">{new Date(selectedPost.publishedAt).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <div className="prose prose-invert max-w-none text-brand-text" style={{whiteSpace: 'pre-wrap'}}>{selectedPost.content}</div>
                        </div>
                        <div className="p-6 border-t border-gray-700/50 flex-shrink-0">
                           <Button onClick={() => setSelectedPost(null)}>{t('blogPage.backToList')}</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default BlogPage;
