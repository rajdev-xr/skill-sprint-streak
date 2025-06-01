
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useUserRoles';
import { useAllChallenges, useCreateChallenge, useUpdateChallenge } from '@/hooks/useChallenges';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Save, X } from 'lucide-react';

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { toast } = useToast();
  const { data: challenges, isLoading } = useAllChallenges();
  const createChallenge = useCreateChallenge();
  const updateChallenge = useUpdateChallenge();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner'
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (!isAdmin) {
      navigate('/');
      toast({
        title: "Access denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive"
      });
    }
  }, [user, isAdmin, navigate, toast]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createChallenge.mutateAsync(formData);
      setFormData({ title: '', description: '', difficulty: 'beginner' });
      setShowCreateForm(false);
      toast({
        title: "Challenge created",
        description: "New challenge has been added successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create challenge.",
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateChallenge.mutateAsync({ id, updates: formData });
      setEditingId(null);
      setFormData({ title: '', description: '', difficulty: 'beginner' });
      toast({
        title: "Challenge updated",
        description: "Challenge has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update challenge.",
        variant: "destructive"
      });
    }
  };

  const startEdit = (challenge: any) => {
    setEditingId(challenge.id);
    setFormData({
      title: challenge.title,
      description: challenge.description || '',
      difficulty: challenge.difficulty
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', difficulty: 'beginner' });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Challenge
            </Button>
          </div>

          {/* Create Challenge Form */}
          {showCreateForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Challenge title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Challenge description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={createChallenge.isPending}>
                      {createChallenge.isPending ? 'Creating...' : 'Create Challenge'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Challenges List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Manage Challenges</h2>
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid gap-4">
                {challenges?.map((challenge) => (
                  <Card key={challenge.id}>
                    <CardContent className="p-6">
                      {editingId === challenge.id ? (
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(challenge.id); }} className="space-y-4">
                          <div>
                            <Label htmlFor={`edit-title-${challenge.id}`}>Title</Label>
                            <Input
                              id={`edit-title-${challenge.id}`}
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-description-${challenge.id}`}>Description</Label>
                            <Textarea
                              id={`edit-description-${challenge.id}`}
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-difficulty-${challenge.id}`}>Difficulty</Label>
                            <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex space-x-2">
                            <Button type="submit" size="sm" disabled={updateChallenge.isPending}>
                              <Save className="w-4 h-4 mr-1" />
                              {updateChallenge.isPending ? 'Saving...' : 'Save'}
                            </Button>
                            <Button type="button" size="sm" variant="outline" onClick={cancelEdit}>
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">{challenge.title}</h3>
                              <Badge className={getDifficultyColor(challenge.difficulty)}>
                                {challenge.difficulty}
                              </Badge>
                              {!challenge.is_active && (
                                <Badge variant="outline" className="text-gray-500">
                                  Inactive
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">{challenge.description}</p>
                            <p className="text-xs text-gray-500">
                              Created: {new Date(challenge.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(challenge)}
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
