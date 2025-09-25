'use client';

import React from 'react';

export default function ProfileLayout({ children }) {
    return (
        <main className="min-h-screen w-full bg-[var(--color-background-3-custom)] flex justify-center items-start px-6 py-10">
            <div className="w-full max-w-4xl">
                {children}
            </div>
        </main>
    );
}