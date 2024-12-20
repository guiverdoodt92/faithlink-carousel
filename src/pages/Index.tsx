import { Navigation } from "@/components/Navigation";
import { Timeline } from "@/components/Timeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <main className="pb-20 sm:pt-20">
        <Timeline />
      </main>
    </div>
  );
};

export default Index;