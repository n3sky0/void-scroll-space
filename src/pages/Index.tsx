import React, { Suspense } from 'react';
import { SpaceScene } from '@/components/SpaceScene';
import { ScrollContent } from '@/components/ScrollContent';

const Index = () => {
  return (
    <div className="relative">
      {/* 3D Black Hole Background */}
      <Suspense fallback={
        <div className="fixed inset-0 bg-gradient-to-b from-background to-muted flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground/60">Initializing cosmic simulation...</p>
          </div>
        </div>
      }>
        <SpaceScene />
      </Suspense>

      {/* Scrollable Content */}
      <ScrollContent />
    </div>
  );
};

export default Index;
