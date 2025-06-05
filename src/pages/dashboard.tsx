import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the inventory page by default
    router.push('/inventory');
  }, [router]);

  return null; // This page will redirect immediately
};

export default Dashboard;
