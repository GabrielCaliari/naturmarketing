import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

interface UserData {
  name?: string;
  email?: string;
  imageUrl?: string;
  // Add other user data fields as needed
}

export const useUserData = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // For now, just use Firebase user data
      // You can extend this to fetch additional user data from your backend
      setUserData({
        name: user.displayName || undefined,
        email: user.email || undefined,
        imageUrl: user.photoURL || undefined,
      });
    } else {
      setUserData(null);
    }
    setLoading(false);
  }, [user]);

  return { userData, loading };
};
