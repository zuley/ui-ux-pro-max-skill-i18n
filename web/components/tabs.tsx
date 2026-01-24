'use client';

import { useState } from 'react';

export interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

export interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex gap-2 border-b border-gray-200/70 dark:border-white/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              px-6 py-3 font-medium text-sm transition-all relative
              ${activeTab === tab.id
                                ? 'text-purple-600 dark:text-purple-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }
            `}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-600" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">{activeTabContent}</div>
        </div>
    );
}
