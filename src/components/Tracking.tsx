'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function Tracking({ gaId, clarityId }: { gaId?: string, clarityId?: string }) {
  useEffect(() => {
    // Escucha todos los clics en la web para capturar botones de WhatsApp y Llamadas
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('[data-track-event]');
      if (!target) return;
      
      const eventAction = target.getAttribute('data-track-event'); // Ej: "whatsapp" o "call"
      const service = target.getAttribute('data-track-service');   // Ej: "sticky-mobile" o "floating"
      
      // Enviar evento a Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_click', {
          event_category: 'Lead',
          event_label: service || 'generic',
          contact_method: eventAction
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
