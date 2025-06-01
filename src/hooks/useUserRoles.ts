
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserRoles = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['userRoles', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) throw error;
      return data?.map(r => r.role) || [];
    },
    enabled: !!user
  });
};

export const useIsAdmin = () => {
  const { data: roles } = useUserRoles();
  return roles?.includes('admin') || false;
};
