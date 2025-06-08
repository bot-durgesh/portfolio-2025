import Grid from "@/components/Grid";
import RecentProjects from "@/components/RecentProjects";
import Acheivements from "@/components/Acheivements";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from '@/data';


export default function Home() {
  return (
    <main className="relative bg-black-100 overflow-hidden flex justify-center items-center flex-col mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
          <Hero />
          <Grid />
          <RecentProjects />
          <Acheivements />
          <Experience />
          <Approach />
        <Footer />
      </div>
    </main>
  );
}
