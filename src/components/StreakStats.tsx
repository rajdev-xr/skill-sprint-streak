
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Flame } from 'lucide-react';
import { useUserStreak } from '@/hooks/useProfile';

export const StreakStats = () => {
  const { data: streak, isLoading } = useUserStreak();

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextBadgeInfo = () => {
    const currentStreak = streak?.current_streak || 0;
    const badges = streak?.badges || [];

    if (!badges.includes('bronze') && currentStreak < 3) {
      return { badge: 'bronze', daysNeeded: 3 - currentStreak };
    }
    if (!badges.includes('silver') && currentStreak < 7) {
      return { badge: 'silver', daysNeeded: 7 - currentStreak };
    }
    if (!badges.includes('gold') && currentStreak < 30) {
      return { badge: 'gold', daysNeeded: 30 - currentStreak };
    }
    return null;
  };

  const nextBadge = getNextBadgeInfo();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-2">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {streak?.current_streak || 0} days
          </div>
          <p className="text-xs text-gray-600">
            {nextBadge 
              ? `${nextBadge.daysNeeded} days until ${nextBadge.badge} badge!`
              : `Longest streak: ${streak?.longest_streak || 0} days`
            }
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Challenges</CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {streak?.total_challenges_completed || 0}
          </div>
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
            <div className="text-2xl font-bold text-purple-600">
              {streak?.badges?.length || 0}
            </div>
            {streak?.badges && streak.badges.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {streak.badges.map((badge, index) => (
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
