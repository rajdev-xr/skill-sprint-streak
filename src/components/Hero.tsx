
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Target, Trophy } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Master Skills,
            <br />
            One Day at a Time
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build coding skills through daily challenges. Track your progress, maintain streaks, 
            and unlock achievements as you grow.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-6"
          >
            Start Your Journey
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            View Demo
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 text-center space-y-4 border-2 hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Daily Challenges</h3>
            <p className="text-gray-600">
              Get a new coding challenge every day to build your skills progressively.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 border-2 hover:border-green-200 transition-colors">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Track Progress</h3>
            <p className="text-gray-600">
              Mark challenges as complete and watch your learning streak grow.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 border-2 hover:border-purple-200 transition-colors">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">Earn Badges</h3>
            <p className="text-gray-600">
              Unlock achievements and badges as you maintain your coding streak.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
