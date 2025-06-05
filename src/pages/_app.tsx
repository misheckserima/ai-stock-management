import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import '@/styles/globals.css';

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password'];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      {isPublicRoute ? (
        <Component {...pageProps} />
      ) : (
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      )}
    </AuthProvider>
  );
}

// Add authentication check for private routes
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}

export default MyApp;
