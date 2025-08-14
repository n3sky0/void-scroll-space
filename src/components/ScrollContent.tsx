import React from 'react';

export const ScrollContent: React.FC = () => {
  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-cosmic animate-float">
            Event Horizon
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto">
            Experience the gravitational pull of a supermassive black hole as cosmic objects spiral into the void
          </p>
          <div className="text-primary/60 animate-pulse">
            <p className="text-lg">Scroll to witness the cosmic dance</p>
            <div className="mt-4 w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Sections */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-accretion">
            The Accretion Disk
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            Matter spirals inward, heating to millions of degrees and emitting brilliant light before crossing the event horizon. 
            The swirling disk of superheated gas and debris creates one of the most spectacular sights in the universe.
          </p>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-cosmic">
            Gravitational Lensing
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            The immense gravity of a black hole bends spacetime itself, distorting the path of light and creating 
            a gravitational lens that reveals distant objects hidden behind the cosmic giant.
          </p>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-primary">
            Stellar Death
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            When massive stars exhaust their nuclear fuel, they collapse under their own gravity, 
            creating these cosmic monsters that devour everything within their gravitational reach.
          </p>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-accretion">
            The Point of No Return
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">
            Beyond the event horizon, not even light can escape. Time dilates, space contracts, 
            and the fundamental nature of reality breaks down at the singularity within.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Event Horizon</h3>
              <p className="text-foreground/60">The boundary beyond which nothing can escape the black hole's gravity</p>
            </div>
            <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <h3 className="text-2xl font-semibold mb-4 text-accent">Singularity</h3>
              <p className="text-foreground/60">The theoretical point of infinite density at the black hole's center</p>
            </div>
            <div className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <h3 className="text-2xl font-semibold mb-4 text-destructive">Hawking Radiation</h3>
              <p className="text-foreground/60">Theoretical radiation that causes black holes to slowly evaporate over time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-cosmic animate-pulse-glow">
            Into the Void
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            As we peer into these cosmic abysses, we glimpse the extreme physics that govern our universe. 
            Black holes remain among the most mysterious and fascinating objects in existence, 
            continuing to challenge our understanding of space, time, and reality itself.
          </p>
        </div>
      </section>
    </div>
  );
};