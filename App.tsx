

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CategoryView from './components/CategoryView';
import Sidebar from './components/Sidebar';
import AiChatbot from './components/AiChatbot';
import ExpertHelp from './components/ExpertHelp';
import Progress from './components/Progress';
import IntroPage from './components/IntroPage';
import AboutPage from './components/AboutPage';
import ResourcesPage from './components/ResourcesPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import AdminPage from './components/AdminPage';
import Confetti from './components/ui/Confetti';
import ErrorBoundary from './components/ErrorBoundary';

// Simulations
import SeedPhraseSim from './components/simulations/SeedPhraseSim';
import SwapSim from './components/simulations/SwapSim';
import InflationVisualizer from './components/simulations/InflationVisualizer';
import WalletConnectionSim from './components/simulations/WalletConnectionSim';
import KycSim from './components/simulations/KycSim';
import PortfolioSim from './components/simulations/PortfolioSim';
import TokenApprovalSim from './components/simulations/TokenApprovalSim';
import BitcoinTransactionSim from './components/simulations/BitcoinTransactionSim';
import EthereumTransactionSim from './components/simulations/EthereumTransactionSim';
import WalletOverviewSim from './components/simulations/WalletOverviewSim';
import PortfolioTrackerSim from './components/simulations/PortfolioTrackerSim';
import CandlestickChartSim from './components/simulations/CandlestickChartSim';
import CoinMarketExplorerSim from './components/simulations/CoinMarketExplorerSim';
import PasswordManagerSim from './components/simulations/PasswordManagerSim';
import LendingBorrowingSim from './components/simulations/LendingBorrowingSim';
import LiquidationRiskSim from './components/simulations/LiquidationRiskSim';
import FiatDepositSim from './components/simulations/FiatDepositSim';
import BuyAndWithdrawSim from './components/simulations/BuyAndWithdrawSim';
import CryptoWithdrawSim from './components/simulations/CryptoWithdrawSim';
import SelfCustodySim from './components/simulations/SelfCustodySim';
import Layer2Sim from './components/simulations/Layer2Sim';
import AirdropSim from './components/simulations/AirdropSim';
import NftSim from './components/simulations/NftSim';
import FractionalReserveSim from './components/simulations/FractionalReserveSim';
import EmergencyFundSim from './components/simulations/EmergencyFundSim';
import DebtRepaymentSim from './components/simulations/DebtRepaymentSim';
import PerpetualFuturesSim from './components/simulations/PerpetualFuturesSim';
import ExpenseTrackingSim from './components/simulations/ExpenseTrackingSim';
import AssetsLiabilitiesSim from './components/simulations/AssetsLiabilitiesSim';

// Data & Services
import { GET_CATEGORIES, LEARNING_PATH } from './constants';
import { getBlogPosts, getBlogPostBySlug } from './services/blogService';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';

// Types
// FIX: Import `View` as a value to be used in component logic, and other interfaces as types.
import { View } from './types';
import type { UserProgress, Category, Simulation, Page, BlogPost } from './types';

const SIMULATION_COMPONENTS: { [key: string]: React.ComponentType<{ onComplete: () => void }> } = {
  'seed-phrase': SeedPhraseSim,
  'swap-tool': SwapSim,
  'inflation-visualizer': InflationVisualizer,
  'wallet-connection': WalletConnectionSim,
  'kyc-sim': KycSim,
  'portfolio-sim': PortfolioSim,
  'token-approval': TokenApprovalSim,
  'bitcoin-transaction': BitcoinTransactionSim,
  'ethereum-transaction': EthereumTransactionSim,
  'wallet-overview': WalletOverviewSim,
  'portfolio-tracker': PortfolioTrackerSim,
  'candlestick-chart': CandlestickChartSim,
  'coin-market-explorer': CoinMarketExplorerSim,
  'password-manager': PasswordManagerSim,
  'lending-borrowing': LendingBorrowingSim,
  'liquidation-risk': LiquidationRiskSim,
  'fiat-deposit': FiatDepositSim,
  'buy-and-withdraw': BuyAndWithdrawSim,
  'crypto-withdraw': CryptoWithdrawSim,
  'self-custody': SelfCustodySim,
  'layer-2-scaling': Layer2Sim,
  'airdrops-farming': AirdropSim,
  'nft-explained': NftSim,
  'fractional-reserve': FractionalReserveSim,
  'emergency-fund': EmergencyFundSim,
  'debt-repayment': DebtRepaymentSim,
  'perpetual-futures': PerpetualFuturesSim,
  'expense-tracking': ExpenseTrackingSim,
  'assets-liabilities': AssetsLiabilitiesSim,
};

const SimulationView: React.FC<{ simulation: Simulation; onComplete: () => void; onBack: () => void }> = ({ simulation, onComplete, onBack }) => {
    const SimulationComponent = SIMULATION_COMPONENTS[simulation.id];
  
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="bg-brand-surface hover:bg-gray-700 text-brand-primary font-bold p-3 rounded-full transition-colors duration-200 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
        </div>
        {SimulationComponent ? <SimulationComponent onComplete={onComplete} /> : <p>Simulation not found.</p>}
      </div>
    );
};

const App: React.FC = () => {
    // FIX: Call `useLanguage` hook at the top level of the component to follow rules of hooks.
    const { t, language } = useLanguage();
    const ALL_SIMULATIONS = useMemo(() => GET_CATEGORIES(t).flatMap(c => c.simulations), [t]);

    const [page, setPage] = useState<Page>('intro');
    const [pageSlug, setPageSlug] = useState<string | null>(null);

    const [view, setView] = useState<View>(View.Dashboard);
    const [userProgress, setUserProgress] = useState<UserProgress>({
        xp: 0,
        badges: [],
        completedSimulations: [],
        hasBookedCall: false,
    });
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    // Initial routing effect
    useEffect(() => {
        const handlePathChange = () => {
            const pathParts = window.location.pathname.split('/').filter(Boolean);
            const lang = pathParts[0] === 'en' || pathParts[0] === 'es' ? pathParts[0] : null;
            const pagePart = lang ? pathParts[1] : pathParts[0];
            const slugPart = lang ? pathParts[2] : pathParts[1];

            switch (pagePart) {
                case 'about': setPage('about'); break;
                case 'resources': setPage('resources'); break;
                case 'blog': 
                    setPage(slugPart ? 'blogpost' : 'blog');
                    if (slugPart) setPageSlug(slugPart);
                    break;
                case 'admin': setPage('admin'); break;
                case 'app': setPage('app'); break;
                default: setPage('intro'); break;
            }
        };

        handlePathChange();
        window.addEventListener('popstate', handlePathChange);
        return () => window.removeEventListener('popstate', handlePathChange);
    }, []);

    // FIX: Remove incorrect hook call from inside a callback and add `language` to dependency array.
    const handleNavigatePage = useCallback((newPage: Page, newSlug: string | null = null) => {
        const langPrefix = language === 'en' ? '' : `/${language}`;
        let path = `${langPrefix}/${newPage}`;
        if (newSlug) {
            path += `/${newSlug}`;
        } else if (newPage === 'intro') {
            path = language === 'en' ? '/' : `/${language}`;
        }
        
        window.history.pushState({}, '', path);
        setPage(newPage);
        setPageSlug(newSlug);
        window.scrollTo(0, 0);
    }, [language]);
    
    const handleStartLearning = useCallback(() => {
        const nextSimId = LEARNING_PATH.find(id => !userProgress.completedSimulations.some(s => s.id === id));
        if (nextSimId) {
            const nextSim = ALL_SIMULATIONS.find(s => s.id === nextSimId);
            if (nextSim) {
                setSelectedSimulation(nextSim);
                setView(View.Simulation);
            }
        } else {
             // If all are completed, go to dashboard
             setView(View.Dashboard);
        }
    }, [userProgress.completedSimulations, ALL_SIMULATIONS]);


    const handleSelectSimulationById = useCallback((simId: string) => {
        const sim = ALL_SIMULATIONS.find(s => s.id === simId);
        if (sim) {
            setSelectedSimulation(sim);
            setView(View.Simulation);
        }
    }, [ALL_SIMULATIONS]);

    const handleCompleteSimulation = useCallback(() => {
        if (!selectedSimulation || userProgress.completedSimulations.some(s => s.id === selectedSimulation.id)) {
            setView(View.Dashboard);
            return;
        }

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);

        setUserProgress(prev => {
            const newBadges = new Set(prev.badges);
            if(selectedSimulation.badge) newBadges.add(selectedSimulation.badge);

            return {
                ...prev,
                xp: prev.xp + selectedSimulation.xp,
                badges: Array.from(newBadges),
                completedSimulations: [
                    ...prev.completedSimulations,
                    { id: selectedSimulation.id, completedAt: new Date().toISOString(), xpGained: selectedSimulation.xp }
                ]
            };
        });
        
        // Find next simulation in the learning path
        const currentSimIndex = LEARNING_PATH.indexOf(selectedSimulation.id);
        const nextSimId = LEARNING_PATH.find((id, index) => index > currentSimIndex && !userProgress.completedSimulations.some(s => s.id === id));
        
        if (nextSimId) {
            const nextSim = ALL_SIMULATIONS.find(s => s.id === nextSimId);
            if(nextSim) {
                setSelectedSimulation(nextSim);
                setView(View.Simulation);
                return;
            }
        }
        
        // If no next sim, go back to dashboard
        setSelectedSimulation(null);
        setView(View.Dashboard);
    }, [selectedSimulation, userProgress.completedSimulations, ALL_SIMULATIONS]);


    const renderContent = () => {
        switch(view) {
            case View.Dashboard:
                return <Dashboard 
                          onStartLearning={handleStartLearning}
                          onSelectCategory={cat => { setSelectedCategory(cat); setView(View.Category); }}
                          userProgress={userProgress}
                        />;
            case View.Category:
                return <CategoryView 
                          category={selectedCategory!}
                          onSelectSimulation={sim => { setSelectedSimulation(sim); setView(View.Simulation); }}
                          onBack={() => setView(View.Dashboard)}
                          userProgress={userProgress}
                        />;
            case View.Simulation:
                return <SimulationView 
                          simulation={selectedSimulation!}
                          onComplete={handleCompleteSimulation}
                          onBack={() => { setSelectedSimulation(null); setView(View.Dashboard); }}
                        />;
            case View.ExpertHelp:
                return <ExpertHelp onBack={() => setView(View.Dashboard)} />;
            case View.Progress:
                return <Progress 
                          userProgress={userProgress}
                          onBack={() => setView(View.Dashboard)}
                          onOpenBookingModal={() => {}} // Placeholder
                          onContinueLearning={handleStartLearning}
                        />;
            default:
                return <Dashboard onStartLearning={handleStartLearning} onSelectCategory={() => {}} userProgress={userProgress} />;
        }
    };
    
    // Page router
    const blogPosts = getBlogPosts();
    const currentPost = page === 'blogpost' && pageSlug ? getBlogPostBySlug(pageSlug) : null;

    if (page === 'intro') return <IntroPage onStart={() => handleNavigatePage('app')} onNavigatePage={handleNavigatePage} onOpenBookingModal={() => {}} />;
    if (page === 'about') return <AboutPage onStart={() => handleNavigatePage('app')} onNavigatePage={handleNavigatePage} onOpenBookingModal={() => {}} />;
    if (page === 'resources') return <ResourcesPage onStart={() => handleNavigatePage('app')} onNavigatePage={handleNavigatePage} onOpenBookingModal={() => {}} />;
    if (page === 'blog') return <BlogPage posts={blogPosts} onSelectPost={(slug) => handleNavigatePage('blogpost', slug)} onStart={() => handleNavigatePage('app')} onNavigatePage={handleNavigatePage} onOpenBookingModal={() => {}} />;
    if (page === 'blogpost' && currentPost) return <BlogPostPage post={currentPost} onStart={() => handleNavigatePage('app')} onNavigatePage={handleNavigatePage} onOpenBookingModal={() => {}} />;
    if (page === 'admin') return <AdminPage onNavigatePage={handleNavigatePage} />;
    if (page !== 'app' && !currentPost) {
        // Fallback for invalid blog slug or path
        return <IntroPage onStart={() => handleNavigatePage('app')} onNavigatePage={handleNavigatePage} onOpenBookingModal={() => {}} />;
    }
    
    // Main App View
    return (
        <div className={`min-h-screen bg-brand-bg app-background font-sans text-brand-text flex transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-72'}`}>
            {showConfetti && <Confetti />}

            <div className="hidden md:block">
              <Sidebar
                  userProgress={userProgress}
                  onSelectSimulation={handleSelectSimulationById}
                  onNavigate={setView}
                  onNavigatePage={handleNavigatePage}
                  currentSimId={selectedSimulation?.id || null}
                  isOpen={true} // Always open on desktop
                  onClose={() => {}}
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
              />
            </div>
            <div className="md:hidden">
              <Sidebar
                  userProgress={userProgress}
                  onSelectSimulation={handleSelectSimulationById}
                  onNavigate={setView}
                  onNavigatePage={handleNavigatePage}
                  currentSimId={selectedSimulation?.id || null}
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  isCollapsed={false} // Never collapsed on mobile
                  onToggleCollapse={() => {}}
              />
            </div>

            <div className="flex-1 flex flex-col">
                <Header 
                    userProgress={userProgress} 
                    onNavigate={setView}
                    onNavigatePage={handleNavigatePage}
                    onStartLearning={handleStartLearning}
                    onOpenBookingModal={() => {}}
                    onToggleSidebar={() => setIsSidebarOpen(true)}
                />
                <main className="flex-grow container mx-auto p-4 md:p-8">
                    {renderContent()}
                </main>
                <AiChatbot onSelectSimulation={handleSelectSimulationById} />
            </div>
        </div>
    );
};

const AppWrapper: React.FC = () => (
    <ErrorBoundary>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </ErrorBoundary>
);

export default AppWrapper;