import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-[#f0fdfa] dark:bg-[#0f172a] relative overflow-x-hidden">
            {/* Gradient Topology Background - Teal Palette, Top-Anchored */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden scale-110">
                <svg className="absolute w-full h-full opacity-60 dark:opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    {/* Background Layer (Lightest Teal) */}
                    <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="#f0fdfa" />

                    {/* Organic Nested Layers - Moving and anchored from top */}
                    <path
                        d="M-100,-100 C100,200 500,400 1100,300 L1100,-100 L-100,-100 Z"
                        fill="#ccfbf1"
                    />
                    <path
                        d="M0,-100 C200,150 600,320 1100,220 L1100,-100 L-100,-100 Z"
                        fill="#99f6e4"
                    />
                    <path
                        d="M100,-100 C300,100 700,240 1100,140 L1100,-100 L-100,-100 Z"
                        fill="#5eead4"
                    />
                    <path
                        d="M200,-100 C400,50 800,160 1100,60 L1100,-100 L-100,-100 Z"
                        fill="#2dd4bf"
                    />
                    <path
                        d="M350,-100 C500,100 900,180 1100,80 L1100,-100 L-100,-100 Z"
                        fill="#14b8a6"
                    />
                </svg>

                {/* Accent Soft Glows for Depth */}
                <div
                    className="absolute top-[-5%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-[#99f6e4] opacity-30"
                />
                <div
                    className="absolute bottom-[10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] bg-[#2dd4bf] opacity-10"
                />
            </div>

            {/* Main Content Wrapper */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
