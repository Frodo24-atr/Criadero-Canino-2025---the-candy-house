import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Script from 'next/script'
import { pageview, GA_TRACKING_ID } from '../lib/analytics'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      {/* Google Search Console Verification */}
      <Script
        id="google-search-console"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Código de verificación de Search Console
            (function() {
              var meta = document.createElement('meta');
              meta.name = 'google-site-verification';
              meta.content = 'tu-codigo-de-verificacion-aqui';
              document.getElementsByTagName('head')[0].appendChild(meta);
            })();
          `,
        }}
      />
      
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
