
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Challenge {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  is_active: boolean;
  created_at: string;
}

interface CheckIn {
  id: string;
  user_id: string;
  challenge_id: string;
  checked_in_date: string;
  motivational_quote: string | null;
  created_at: string;
}

// Get today's challenge (random active challenge)
export const useTodaysChallenge = () => {
  const today = new Date().toISOString().split('T')[0];

  return useQuery({
    queryKey: ['todaysChallenge', today],
    queryFn: async (): Promise<Challenge | null> => {
      // Get a deterministic challenge based on today's date
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('created_at');

      if (error) throw error;
      if (!data || data.length === 0) return null;

      // Use date to pick a challenge deterministically
      const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      return data[dayOfYear % data.length];
    }
  });
};

export const useCheckIns = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['checkIns', user?.id],
    queryFn: async (): Promise<CheckIn[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('check_ins')
        .select('*')
        .eq('user_id', user.id)
        .order('checked_in_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });
};

export const useCreateCheckIn = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ challengeId, quote }: { challengeId: string; quote?: string }) => {
      if (!user) throw new Error('No user');

      const { data, error } = await supabase
        .from('check_ins')
        .insert({
          user_id: user.id,
          challenge_id: challengeId,
          motivational_quote: quote
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkIns'] });
      queryClient.invalidateQueries({ queryKey: ['userStreak'] });
    }
  });
};

export const useAllChallenges = () => {
  return useQuery({
    queryKey: ['allChallenges'],
    queryFn: async (): Promise<Challenge[]> => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (challenge: { title: string; description: string; difficulty: string }) => {
      const { data, error } = await supabase
        .from('challenges')
        .insert(challenge)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allChallenges'] });
    }
  });
};

export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Challenge> }) => {
      const { data, error } = await supabase
        .from('challenges')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allChallenges'] });
    }
  });
};
