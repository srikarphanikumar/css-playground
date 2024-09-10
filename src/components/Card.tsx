import React, { useState, useEffect } from 'react';
import { Code, Image } from 'lucide-react';

interface CardProps {
    id: string;
    title: string;
    children: React.ReactNode;
    html: string;
    className: string;
}

const Card: React.FC<CardProps> = ({ id, title, children, html, className }) => {
    const [showCode, setShowCode] = useState(false);
    const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
    const [cssContent, setCssContent] = useState('');

    useEffect(() => {
        const fetchCSS = async () => {
            try {
                const response = await fetch('/api/getCss');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                const regex = new RegExp(`\\.${className}\\s*{[^}]*}`, 'g');
                const match = text.match(regex);
                if (match) {
                    setCssContent(match[0]);
                } else {
                    setCssContent(`/* No CSS found for .${className} */`);
                }
            } catch (error) {
                console.error('Error fetching CSS:', error);
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                setCssContent(`/* Error fetching CSS: ${errorMessage} */`);
            }
        };

        fetchCSS();
    }, [className]);

    const toggleView = () => setShowCode(!showCode);

    return (
        <div
            className="border border-gray-700 rounded-lg p-4 shadow-md flex flex-col h-[400px] bg-gray-800 text-white"
            id={id}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                    onClick={toggleView}
                    className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                    aria-label={showCode ? "Show shape" : "Show code"}
                >
                    {showCode ? <Image size={20} /> : <Code size={20} />}
                </button>
            </div>
            {showCode ? (
                <div className="flex-grow flex flex-col">
                    <div className="flex mb-2 bg-gray-700 rounded-t-lg">
                        <button
                            className={`px-4 py-2 ${activeTab === 'html' ? 'border-b-2 border-blue-500' : ''} transition-colors duration-200`}
                            onClick={() => setActiveTab('html')}
                        >
                            HTML
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'css' ? 'border-b-2 border-blue-500' : ''} transition-colors duration-200`}
                            onClick={() => setActiveTab('css')}
                        >
                            CSS
                        </button>
                    </div>
                    <pre className="flex-grow bg-gray-900 p-4 rounded-b-lg text-sm overflow-auto">
                        <code className="text-gray-300">
                            {activeTab === 'html' ? html : cssContent}
                        </code>
                    </pre>
                </div>
            ) : (
                <div className="flex-grow flex justify-center items-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-4 rounded-lg">
                    <div className={`${className} w-full h-full flex items-center justify-center`}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;