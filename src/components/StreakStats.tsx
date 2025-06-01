
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Flame } from 'lucide-react';

export const StreakStats = () => {
  // Demo data - will be replaced with Supabase data
  const currentStreak = 5;
  const totalChallenges = 12;
  const badges = ['bronze']; // bronze at 3 days, silver at 7 days

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{currentStreak} days</div>
          <p className="text-xs text-gray-600">
            {7 - currentStreak} days until silver badge!
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Challenges</CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{totalChallenges}</div>
          <p className="text-xs text-gray-600">
            Challenges completed
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
          <Trophy className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">{badges.length}</div>
            {badges.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {badges.map((badge, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className={getBadgeColor(badge)}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-600">
                Complete 3 days for bronze!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
