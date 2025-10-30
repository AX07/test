import React, { useState, useEffect } from 'react';
import type { BlogPost, Page } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Footer from './Footer';
import { useLanguage } from '../hooks/useLanguage';
import { MenuIcon, XMarkIcon } from './icons/Icons';

interface BlogPostPageProps {
  post: BlogPost;
  onStart: () => void;
  onNavigatePage: (page: Page) => void;
  onOpenBookingModal: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onStart, onNavigatePage, onOpenBookingModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="text-brand-text font-sans selection:bg-brand-primary/20 app-background min-h-screen">
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
                <Card className="max-w-4xl mx-auto bg-brand-surface animate-fade-in">
                    <img src={post.imageUrl} alt={post.title} className="h-64 md:h-96 w-full object-cover rounded-t-xl" />
                    <article className="p-6 md:p-10">
                        <div className="mb-6">
                           <Button onClick={() => onNavigatePage('blog')} className="text-sm py-1 px-3">&larr; {t('blogPage.backToList')}</Button>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
                        <p className="text-sm text-gray-400 mb-8">{new Date(post.publishedAt).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        
                        <div className="prose prose-lg prose-invert max-w-none text-brand-text leading-relaxed" style={{whiteSpace: 'pre-wrap'}}>
                            {post.content.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </article>
                </Card>
            </main>

            <Footer onStart={onStart} onNavigatePage={onNavigatePage} onOpenBookingModal={onOpenBookingModal} />
        </div>
    );
};

export default BlogPostPage;