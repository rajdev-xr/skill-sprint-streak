
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useCheckIns } from '@/hooks/useChallenges';
import { CheckCircle, Calendar as CalendarIcon } from 'lucide-react';

const CalendarPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: checkIns, isLoading } = useCheckIns();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Convert check-ins to dates for calendar highlighting
  const checkInDates = checkIns?.map(checkIn => new Date(checkIn.checked_in_date)) || [];

  // Group check-ins by month for stats
  const checkInsByMonth = checkIns?.reduce((acc, checkIn) => {
    const month = new Date(checkIn.checked_in_date).toLocaleString('default', { month: 'long', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Progress Calendar
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Your Challenge Completions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  ) : (
                    <Calendar
                      mode="multiple"
                      selected={checkInDates}
                      className="rounded-md border"
                      classNames={{
                        day_selected: "bg-green-500 text-white hover:bg-green-600"
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              {/* Total Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overall Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Check-ins:</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {checkIns?.length || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month:</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {checkInsByMonth[new Date().toLocaleString('default', { month: 'long', year: 'numeric' })] || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Days:</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {checkInDates.length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(checkInsByMonth)
                      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                      .slice(0, 6)
                      .map(([month, count]) => (
                        <div key={month} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{month}</span>
                          <Badge variant="outline" className="text-xs">
                            {count} {count === 1 ? 'day' : 'days'}
                          </Badge>
                        </div>
                      ))}
                    {Object.keys(checkInsByMonth).length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Complete your first challenge to see stats!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {checkIns?.slice(0, 5).map((checkIn) => (
                      <div key={checkIn.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">
                            {new Date(checkIn.checked_in_date).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Completed
                        </Badge>
                      </div>
                    ))}
                    {checkIns?.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No activity yet. Start completing challenges!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
