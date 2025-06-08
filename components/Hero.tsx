import { Spotlight } from './ui/Spotlight'
import MagicButton from './ui/MagicButton';
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { cn } from "@/utils/cn";
import { FaLocationArrow } from "react-icons/fa";

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

        <div className="relative z-10 flex justify-center">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
              Dynamic magic with Next.JS
            </h2>

            <TextGenerateEffect
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
              words="Transforming Concepts into Seamless User Experiences"
            />

            <p className="text-center md:tracking-wider font-bold mb-4 text-sm md:text-lg lg:text-2xl">
              Hi, I am Durgesh.
            </p>

            <a href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position='right'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;