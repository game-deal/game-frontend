import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import SVG from 'react-inlinesvg'

const Footer: React.FC = () => {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container flex flex-col md:flex-row justify-between items-center py-4">
                <div className="flex items-center text-base text-muted-foreground">
{/*                    <Image
                        src="/proclad2.png"
                        alt="Proclad Logo"
                        width={120}
                        height={60}
                        className="mr-1"
                    />*/}
                    <p className="text-white">Game Deals</p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <Link href="/" legacyBehavior>
                        <a className="text-muted-foreground hover:text-white">Home</a>
                    </Link>
                    <Link href="/status" legacyBehavior>
                        <a className="text-muted-foreground hover:text-white">Status</a>
                    </Link>
                </div>
                <div className="flex p-2 flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
                    <Button key="1" className="flex items-center space-x-2 bg-transparent" variant="outline">
                        <CircleIcon className="h-4 w-4 animate-pulse text-green-500" />
                        <span>All Systems Operational</span>
                    </Button>
                </div>
            </div>
        </footer>
    );
};

function CircleIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
        </svg>
    )
}

export default Footer;