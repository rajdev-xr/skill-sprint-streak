
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { DailyChallenge } from '@/components/DailyChallenge';
import { StreakStats } from '@/components/StreakStats';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {!user ? (
        <Hero onGetStarted={() => navigate('/auth')} />
      ) : (
        <main className="container mx-auto px-4 py-8 space-y-8">
          <StreakStats />
          <DailyChallenge />
        </main>
      )}
    </div>
  );
};

export default Index;
