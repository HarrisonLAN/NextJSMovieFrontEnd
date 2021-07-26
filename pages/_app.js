import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import '../styles.css';
export default function App({ Component, pageProps }) {
  return (
    <Provider

      options={{

        clientMaxAge: 0,

        keepAlive: 0
      }}
      session={pageProps.session} >
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Provider>
  )
}

function Auth({ children }) {
  const router = useRouter();
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  // THE PAGE YOU WANT UNAUTHED USERS TO GO TO
  const REDIRECT_PATH = '/login';
  // THE PROTECTED ROUTES 
  const PROTECTED_ROUTES = ['/movies', '/account'];
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    router.asPath.startsWith(route),
  );

  useEffect(() => {
    if (loading) return;
    if (!isUser && isProtectedRoute) {
      console.log("isnt logged in");
      router.push(REDIRECT_PATH);
    }
  }, [isUser, loading]);

  if (!isProtectedRoute || router.asPath === REDIRECT_PATH) {
    console.log("default route");
    return children;
  }
  if (session) return children;

  return <p> Loading... </p>;
}