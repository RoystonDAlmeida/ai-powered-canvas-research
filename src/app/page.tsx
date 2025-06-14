'use client';

import { CopilotSidebar } from '@copilotkit/react-ui';
import ResearchCanvas from '@/components/ResearchCanvas';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">AI-Powered Research Canvas</h1>
        <ResearchCanvas />
        <CopilotSidebar
          defaultOpen={true}
          className="w-96"
        />
      </div>
    </main>
  );
} 