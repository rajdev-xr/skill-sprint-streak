
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_seed: string | null;
  created_at: string;
  updated_at: string;
}

interface UserStreak {
  current_streak: number;
  longest_streak: number;
  badges: string[];
  total_challenges_completed: number;
}

export const useProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async (): Promise<Profile | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });
};

export const useUserStreak = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['userStreak', user?.id],
    queryFn: async (): Promise<UserStreak | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_streaks')
        .select('current_streak, longest_streak, badges, total_challenges_completed')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user) throw new Error('No user');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
};
