// Import necessary dependencies and components
import { useState, useEffect } from 'react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import GridPattern from "@/components/magicui/grid-pattern";
import Footer from "@/components/footer";
import { SWRConfig } from 'swr';
import NextNProgress from 'nextjs-progressbar';
// Import CookiePreferences component

// Define the App component
export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
    const [showCookiePreferences, setShowCookiePreferences] = useState<boolean>(false);

    useEffect(() => {
        const hasAcceptedCookies = localStorage.getItem('hasAcceptedCookies');
        setShowCookiePreferences(hasAcceptedCookies !== 'true');
    }, []);

    const handleAcceptCookies = () => {
        localStorage.setItem('hasAcceptedCookies', 'true');
        setShowCookiePreferences(false);
    };

    return (
        <SWRConfig
            value={{
                refreshInterval: 40000,
                revalidateOnFocus: false,
            }}
        >
            <NextNProgress
                options={{
                    showSpinner: true,
                }}
                color="#facc15"
                startPosition={0.1}
                stopDelayMs={100}
                height={3}
                showOnShallow={false}
            />

            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Component {...pageProps} />
            </ThemeProvider>
{/*             Render CookiePreferences component only if showCookiePreferences is true
            {showCookiePreferences && <CookiePreferences onAccept={handleAcceptCookies} />}*/}
            <Toaster richColors theme="dark" closeButton />
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                className={
                    "-z-10 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] "
                }
            />

            <Footer />
        </SWRConfig>
    );
}
