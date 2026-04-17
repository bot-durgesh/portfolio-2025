import { Spotlight } from './ui/Spotlight'
import MagicButton from './ui/MagicButton';
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { cn } from "@/utils/cn";
import { FaLocationArrow } from "react-icons/fa";
import Laptop3D from './ui/Laptop3D';

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      <div className={`absolute top-0 inset-0 `}>
        <Spotlight className="-top-40 -left-40 md:-left-32 md:-top-20 h-screen w-[50vw]" fill="white" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
        <Spotlight className="top-10 left-full w-full h-[80vh] " fill="purple" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black-100">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:60px_60px]",
            "[background-image:linear-gradient(to_right,rgba(196,181,253,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(196,181,253,0.2)_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,rgba(196,181,253,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(196,181,253,0.15)_1px,transparent_1px)]",
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left Side - Content */}
          <div className="flex-1 max-w-[50vw] flex flex-col items-start justify-center">
            

            <TextGenerateEffect
              className="text-left text-[32px] md:text-4xl lg:text-5xl mb-6"
              words="Transforming Concepts into Seamless User Experiences"
            />

            <p className="text-left md:tracking-wider font-bold mb-6 text-sm md:text-lg lg:text-xl">
              Hi, I am Durgesh, a Full Stack Developer passionate about creating innovative web solutions.
            </p>

            <a href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position='right'
              />
            </a>
          </div>

          {/* Right Side - 3D Laptop */}
          <div className="mt-40 flex-1 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* <Laptop3D /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;