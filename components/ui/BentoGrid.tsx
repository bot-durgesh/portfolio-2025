'use client'

import { cn } from "@/utils/cn";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import MagicButton from "./MagicButton";
import React, { useState } from "react";
import animationData from "@/data/confetti.json";
import Lottie from "lottie-react";
import { IoCopyOutline } from "react-icons/io5";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-10 md:auto-rows-[12rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('durgesh1812b@gmail.com');
    setCopied(true);
  }

  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 relative overflow-hidden rounded-3xl border border-white/[0.1] transition duration-200 hover:shadow-xl dark:shadow-none",
        className,
      )}
      style={{
        background: 'rgb(4, 7, 29)',
        backgroundColor: 'linear-gradient(90deg, rgba(4, 7, 29, 1) 0%, rgba(12, 14, 35, 1) 100%)',
      }}
    >
      <div className={`${id === 6 ? 'flex justify-center h-full' : ''}`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, 'object-cover object-center')}
            />
          )}
        </div>

        <div className={`absolute right-0 -bottom-5 ${id === 5 ? 'w-full opacity-80' : ''}`}>
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>

        {id === 6 && (
          <BackgroundGradientAnimation>
            {/* <div className="absolute z-50 flex items-center justify-center text-white font-bold" /> */}
          </BackgroundGradientAnimation>
        )}

        <div className={cn(
          titleClassName, 'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full flex flex-col px-5 p-5 lg:p-10'
        )}>
          <div className="font-sans text-sm font-extralight text-[#c1c2d3] md:text-xs lg:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-lg lg:text-2xl max-w-96 z-20">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-2 lg:gap-2 pt-6">
                {['React.js', 'Next.js', 'Scikit-learn'].map((item) => (
                  <span
                    key={item}
                    className="py-1 lg:py-2 lg:px-2 px-2 text-xs lg:text-sm opacity-50 lg:opacity-80 rounded-md text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
              </div>
              <div className="flex flex-col gap-2 lg:gap-2">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
                {['Python', 'C/C++', 'Frontend'].map((item) => (
                  <span
                    key={item}
                    className="py-1 lg:py-2 lg:px-2 px-2 text-xs lg:text-sm opacity-50 lg:opacity-80 rounded-md text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="w-full mt-5 relative flex flex-col items-center justify-center">
              <div className="absolute  right-0">
                <Lottie
                  animationData={animationData}
                  loop={copied}
                  autoplay={copied}
                  style={{ width: 200, height: 200 }}
                />
              </div>

              <MagicButton 
                title = {copied? 'Email copied' : 'Copy my email'}
                icon = {<IoCopyOutline />}
                position = 'left'
                otherClasses = '!bg[#161a31]'
                handleClick = {handleCopy}
              />

            </div>
          )}
        </div>
      </div>
    </div>
  );
};