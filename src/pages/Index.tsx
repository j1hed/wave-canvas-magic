import { Waves } from "@/components/ui/wave-background";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Wave Background */}
      <div className="absolute inset-0 wave-container">
        <Waves
          className="w-full h-full"
          strokeColor="#0ea5e9"
          backgroundColor="#000000"
          pointerSize={0.6}
        />
        {/* Ambient glow overlay */}
        <div className="absolute inset-0 wave-glow pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto wave-content">
          {/* Main heading with glow effect */}
          <div className="mb-8 animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
              Wave Canvas Magic
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience interactive fluid dynamics with beautiful wave patterns that respond to your every movement
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="default" 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Explore Waves
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 transition-all duration-300 hover:bg-card/50 hover:border-primary/30">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-primary rounded animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Interactive</h3>
              <p className="text-muted-foreground text-sm">Waves respond dynamically to mouse movement and touch</p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 transition-all duration-300 hover:bg-card/50 hover:border-primary/30">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-accent rounded animate-spin" style={{animationDuration: '3s'}} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Fluid Motion</h3>
              <p className="text-muted-foreground text-sm">Smooth physics-based animations using simplex noise</p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 transition-all duration-300 hover:bg-card/50 hover:border-primary/30">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded animate-wave-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Visual Beauty</h3>
              <p className="text-muted-foreground text-sm">Stunning generative art that's unique every time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </main>
  );
};

export default Index;
