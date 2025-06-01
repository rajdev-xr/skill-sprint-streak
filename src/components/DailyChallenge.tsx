
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';

export const DailyChallenge = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [quote, setQuote] = useState('');

  // Sample challenges for demo
  const challenges = [
    "Build a dropdown menu using CSS only",
    "Create a responsive card component with flexbox",
    "Implement a simple modal using HTML, CSS, and JavaScript",
    "Design a loading spinner with CSS animations",
    "Build a form validation function in JavaScript"
  ];

  const today = new Date();
  const challengeIndex = today.getDate() % challenges.length;
  const currentChallenge = challenges[challengeIndex];

  useEffect(() => {
    // Fetch motivational quote (placeholder for now)
    setQuote("The way to get started is to quit talking and begin doing. - Walt Disney");
  }, []);

  const handleComplete = () => {
    // TODO: Save to Supabase
    setIsCompleted(true);
    console.log('Challenge completed!');
  };

  return (
    <div className="space-y-6">
      {/* Motivational Quote */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <p className="text-lg italic text-gray-700">"{quote}"</p>
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
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {currentChallenge}
            </h3>
            <p className="text-gray-600">
              Take on today's coding challenge and mark it complete when you're done. 
              Every completion adds to your learning streak!
            </p>
          </div>

          <div className="flex justify-center">
            {isCompleted ? (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Challenge Completed! 🎉</span>
              </div>
            ) : (
              <Button
                onClick={handleComplete}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                I Did This! ✨
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
