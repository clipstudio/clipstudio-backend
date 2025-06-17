import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login successful",
        description: "Welcome back to ClipperStudio!",
      });

      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Create profile for the new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            name,
            subscription_status: 'trial'
          }
        ]);

      if (profileError) throw profileError;

      toast({
        title: "Account created",
        description: "Welcome to ClipperStudio!",
      });

      return true;
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging out.",
        variant: "destructive",
      });
    }
  };

  const updateUserSubscription = async (subscriptionDetails) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_status: subscriptionDetails.status,
          subscription_plan: subscriptionDetails.plan,
          next_billing_date: subscriptionDetails.nextBillingDate
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Subscription updated",
        description: "Your subscription has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription.",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUserSubscription,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};