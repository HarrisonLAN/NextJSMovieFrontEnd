import 'tailwindcss/tailwind.css'
// _app.jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';
import { Provider } from 'next-auth/client';
import AppContext from '../lib/context/Context';
import { IState } from 'models/State';
import Loading from 'components/common/Loading';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const session = getSession();

  return (
    <Provider session={pageProps.session}>
      <AppContext.Provider value={[context, setContext]}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </AppContext.Provider>
    </Provider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const [session, loading] = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (loading) return;
    if (!isUser) {
      router.push('/login');
    }
  }, [isUser, loading]);

  if (isUser || router.asPath === '/login') {
    return children;
  }

  return <Loading />;
}