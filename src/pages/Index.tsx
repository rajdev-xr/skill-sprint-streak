
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { DailyChallenge } from '@/components/DailyChallenge';
import { StreakStats } from '@/components/StreakStats';
import { AuthModal } from '@/components/AuthModal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header 
        isLoggedIn={isLoggedIn} 
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      
      {!isLoggedIn ? (
        <Hero onGetStarted={() => setIsAuthModalOpen(true)} />
      ) : (
        <main className="container mx-auto px-4 py-8 space-y-8">
          <StreakStats />
          <DailyChallenge />
        </main>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
};

export default Index;
