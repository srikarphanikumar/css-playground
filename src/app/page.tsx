'use client';
import React, { useState, useEffect } from 'react';
import { Layout, Box, X } from 'lucide-react';
import GeometricShapes from '@/components/GeometricShapes';
import Flex from '@/components/Flex';
import Grid from '@/components/Grid';

const tabs = ['Geometric Shapes', 'Flexbox', 'Grid'];

export default function Home() {
    const [activeTab, setActiveTab] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <main className="min-h-screen bg-gray-900 text-white relative">
            <div className="subtle-pattern absolute inset-0 opacity-10"></div>

            <nav className="bg-gray-800 bg-opacity-80 shadow-lg relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Box className="h-8 w-8 text-white mr-2" />
                            <span className="font-bold text-xl">CSS Playground</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(index)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === index
                                            ? 'bg-gray-700 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            } transition-colors duration-200`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                <Layout className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} />
                                <X className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} />
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(index);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${activeTab === index
                                        ? 'bg-gray-700 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        } transition-colors duration-200 w-full text-left`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl p-6 animate-fade-in">
                    {activeTab === 0 && <GeometricShapes />}
                    {activeTab === 1 && <Flex />}
                    {activeTab === 2 && <Grid />}
                </div>
            </div>
        </main>
    );
}