
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { UserAvatar } from '@/components/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, useUserStreak, useUpdateProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Target, Flame } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: streak } = useUserStreak();
  const updateProfile = useUpdateProfile();

  const [fullName, setFullName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (profile) {
      setFullName(profile.full_name || '');
    }
  }, [user, profile, navigate]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({ full_name: fullName });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive"
      });
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <UserAvatar seed={profile?.avatar_seed} size="lg" />
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="max-w-sm"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} disabled={updateProfile.isPending}>
                          {updateProfile.isPending ? 'Saving...' : 'Save'}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {profile?.full_name || 'Anonymous User'}
                      </h1>
                      <p className="text-gray-600">{profile?.email}</p>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="mt-2"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
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
                  Longest: {streak?.longest_streak || 0} days
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
                <p className="text-xs text-gray-600">Completed</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                <Trophy className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {streak?.badges?.length || 0}
                </div>
                {streak?.badges && streak.badges.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-2">
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
                  <p className="text-xs text-gray-600">Complete challenges to earn badges!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
