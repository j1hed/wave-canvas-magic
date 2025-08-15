import { Waves } from "@/components/ui/wave-background";
import { ThreeWaveScene } from "@/components/ui/three-wave-scene";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

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
        {/* 3D Scene Overlay */}
        <ThreeWaveScene />
        {/* Ambient glow overlay */}
        <div className="absolute inset-0 wave-glow pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto wave-content">
          {/* Main heading with enhanced glow effect */}
          <div className="mb-8 animate-float">
            <div className="relative mb-6">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow relative z-10">
                Wave Canvas Magic
              </h1>
              <div className="absolute inset-0 text-6xl md:text-8xl font-bold blur-lg bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 bg-clip-text text-transparent animate-pulse"></div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-background/10 p-4 rounded-lg border border-primary/20">
              Experience next-generation interactive fluid dynamics with stunning 3D wave patterns that respond to your every movement
            </p>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={() => navigate('/explore')}
              size="lg"
              className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/25 border-0 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Explore Waves
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20 backdrop-blur-sm bg-background/10"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Learn More
            </Button>
          </div>

          {/* Enhanced feature cards with 3D effects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="group bg-card/20 backdrop-blur-md border border-primary/30 rounded-xl p-8 transition-all duration-500 hover:bg-card/40 hover:border-primary/60 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-primary/20">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Zap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Interactive Physics</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Real-time wave simulation with mouse and touch interaction, powered by advanced physics algorithms</p>
            </div>

            <div className="group bg-card/20 backdrop-blur-md border border-accent/30 rounded-xl p-8 transition-all duration-500 hover:bg-card/40 hover:border-accent/60 hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:shadow-accent/20">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-primary/30 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse group-hover:animate-bounce" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">3D Visualization</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Immersive three-dimensional wave rendering with dynamic lighting and particle effects</p>
            </div>

            <div className="group bg-card/20 backdrop-blur-md border border-primary/30 rounded-xl p-8 transition-all duration-500 hover:bg-card/40 hover:border-primary/60 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-primary/20">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-accent group-hover:animate-spin transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Generative Art</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Unique artistic patterns generated through mathematical beauty and algorithmic creativity</p>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl border border-primary/20">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to dive into the waves?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Discover the mesmerizing world of interactive wave dynamics. Control parameters in real-time and create your own unique wave patterns.
            </p>
            <Button 
              onClick={() => navigate('/explore')}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced bottom accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      <div className="absolute bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-40" />
    </main>
  );
};

export default Index;
