import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | { email: string; id: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSupabaseConnected: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'gokul_admin_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | { email: string; id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } else {
      // Local fallback session
      const savedAuth = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (savedAuth) {
        try {
          setUser(JSON.parse(savedAuth));
        } catch {
          localStorage.removeItem(LOCAL_ADMIN_KEY);
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setUser(data.user);
        return { success: true };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Authentication failed';
        return { success: false, error: message };
      }
    } else {
      // Local admin auth check
      // For immediate convenience without configuring Supabase yet:
      // Accepts admin credentials
      if ((email.trim().toLowerCase() === 'admin@gokulavasan.com' || email.trim().toLowerCase() === 'gokulavasan.creative@gmail.com') && password === 'admin123') {
        const mockAdminUser = { id: 'admin-gokul', email };
        setUser(mockAdminUser);
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(mockAdminUser));
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Invalid credentials. For local preview, use admin@gokulavasan.com / admin123, or connect Supabase.'
        };
      }
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(LOCAL_ADMIN_KEY);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isSupabaseConnected: isSupabaseConfigured,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
