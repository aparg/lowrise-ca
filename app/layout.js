import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Lowrise - Canadian Homes for Sale and Rent",
  description:
    "Looking for New Homes for Sale and Rent near Greater Toronto Area, Canada? From Townhomes to Detached and Condos Lowrise has all kinds of homes for sale and rent.",
  keywords:
    "homes for sale, homes for rent, real estate, GTA, Toronto, Ontario, Alberta, condos, townhouses, detached homes",
  authors: [{ name: "Lowrise" }],
  creator: "Lowrise",
  publisher: "Lowrise",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lowrise.ca"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://lowrise.ca/favicon.ico",
    shortcut: "https://lowrise.ca/favicon-16x16.png",
    apple: "https://lowrise.ca/apple-touch-icon.png",
  },
  openGraph: {
    title: "Lowrise - Canadian Homes for Sale and Rent",
    description:
      "Looking for New Homes for Sale and Rent near Greater Toronto Area, Canada? From Townhomes to Detached and Condos Lowrise has all kinds of homes for sale and rent.",
    url: "https://lowrise.ca",
    siteName: "Lowrise",
    images: [
      {
        url: "https://lowrise.ca/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lowrise - Canadian Homes for Sale and Rent",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lowrise - Canadian Homes for Sale and Rent",
    description:
      "Looking for New Homes for Sale and Rent near Greater Toronto Area, Canada? From Townhomes to Detached and Condos Lowrise has all kinds of homes for sale and rent.",
    images: ["https://lowrise.ca/twitter-image.jpg"],
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export const viewport = {
  initialScale: 1.0,
  width: "device-width",
  height: "device-height",
  minimumScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3QLRJ1MEWZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3QLRJ1MEWZ');
          `}
        </Script>
        <Script id="analytics" strategy="afterInteractive">
          {`
            (function() {
              const TRACKING_URL = 'https://analytics.homebaba.ca/api/track/';
              const SITE_ID = 'd0e45564-2d52-4980-89be-5c3859ba1642';
              let visitorId = localStorage.getItem('visitorId');

              function shouldTrack() {
                return !!localStorage.getItem('visitorId');
              }

              function track(eventType, data) {
                if (!shouldTrack()) return;
                const commonData = {
                  visitor_id: visitorId,
                  user_agent: navigator.userAgent,
                  language: navigator.language,
                  screen_resolution: \`\${window.screen.width}x\${window.screen.height}\`,
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                };
                fetch(TRACKING_URL, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    site_id: SITE_ID,
                    event_type: eventType,
                    ...commonData,
                    ...data
                  })
                });
              }

              // Track page views for identified users
              function trackPageView() {
                if (shouldTrack()) {
                  track('Viewed Page', {
                    page_title: document.title,
                    page_url: window.location.href,
                    page_referrer: document.referrer || null
                  });
                }
              }

              // Track initial page load
              trackPageView();

              // Track page views on route changes (for SPAs)
              let lastUrl = window.location.href;

              // Create a new MutationObserver instance
              const observer = new MutationObserver(function(mutations) {
                if (window.location.href !== lastUrl) {
                  lastUrl = window.location.href;
                  // Wait for title to be updated
                  setTimeout(trackPageView, 100);
                }
              });

              // Start observing the document with the configured parameters
              observer.observe(document, {
                subtree: true,
                childList: true
              });

              // Track form submissions
              document.addEventListener('submit', function(e) {
                const form = e.target;
                const formData = new FormData(form);
                const data = {};
                let hasEmail = false;

                formData.forEach((value, key) => {
                  data[key] = value;
                  if (key === 'email') {
                    hasEmail = true;
                    localStorage.setItem('visitorId', btoa(value));
                    visitorId = btoa(value);
                  }
                });

                if (hasEmail) {
                  track('Form Submission', {
                    form_data: data,
                    form_id: form.id || 'unknown',
                    page_url: window.location.href,
                    page_referrer: document.referrer || null
                  });
                }
              });
            })();
          `}
        </Script>
        <NextTopLoader color="red" height={3} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
