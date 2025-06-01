
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Zap } from 'lucide-react';
import { useTodaysChallenge, useCheckIns, useCreateCheckIn } from '@/hooks/useChallenges';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { fetchMotivationalQuote } from '@/utils/motivationalQuotes';

export const DailyChallenge = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: todaysChallenge, isLoading } = useTodaysChallenge();
  const { data: checkIns } = useCheckIns();
  const createCheckIn = useCreateCheckIn();
  const [quote, setQuote] = useState('');
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const todaysCheckIn = checkIns?.find(checkIn => 
    checkIn.checked_in_date === today && 
    checkIn.challenge_id === todaysChallenge?.id
  );

  useEffect(() => {
    const loadQuote = async () => {
      setIsLoadingQuote(true);
      const motivationalQuote = await fetchMotivationalQuote();
      setQuote(motivationalQuote);
      setIsLoadingQuote(false);
    };
    loadQuote();
  }, []);

  const handleComplete = async () => {
    if (!todaysChallenge || !user) return;

    try {
      await createCheckIn.mutateAsync({ 
        challengeId: todaysChallenge.id, 
        quote 
      });
      toast({
        title: "Challenge Completed! 🎉",
        description: "Great job! Your streak has been updated."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message?.includes('duplicate') 
          ? "You've already completed today's challenge!" 
          : "Failed to mark challenge as complete.",
        variant: "destructive"
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!todaysChallenge) {
    return (
      <Card className="border-2 border-gray-200">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No challenge available today. Check back tomorrow!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Motivational Quote */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6 text-center">
          {isLoadingQuote ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          ) : (
            <p className="text-lg italic text-gray-700">"{quote}"</p>
          )}
        </CardContent>
      </Card>

      {/* Daily Challenge */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Today's Challenge</span>
            </span>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-800 flex-1">
                {todaysChallenge.title}
              </h3>
              <div className="flex items-center space-x-2 ml-4">
                <Badge className={getDifficultyColor(todaysChallenge.difficulty)}>
                  {todaysChallenge.difficulty}
                </Badge>
                <Zap className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
            {todaysChallenge.description && (
              <p className="text-gray-600 mb-3">
                {todaysChallenge.description}
              </p>
            )}
            <p className="text-sm text-gray-500">
              Take on today's coding challenge and mark it complete when you're done. 
              Every completion adds to your learning streak!
            </p>
          </div>

          <div className="flex justify-center">
            {todaysCheckIn ? (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Challenge Completed! 🎉</span>
              </div>
            ) : (
              <Button
                onClick={handleComplete}
                size="lg"
                disabled={createCheckIn.isPending || !user}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {createCheckIn.isPending ? 'Marking Complete...' : 'I Did This! ✨'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
