import React from 'react'
import {workExperience} from '@/data'
import {Button} from './ui/MovingBorders'


const Experience = () => {
  return (
    <div className="py-20" id="achievements">
            <h1 className="heading">
                My <span className="text-purple"> Work Experience</span>
            </h1>

            <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
                {workExperience.map((card) => (
                    <Button key= {card.id} duration={10000} borderRadius = '1.75rem' className="flex-1 text-white border-neutral-100 dark:border-slate-800">
                        <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                            <img src= {card.thumbnail} alt = {card.thumbnail} className="lg:w-32 md:w-20"/>
                            <div className="lg:ms-5">
                                <h1 className="text-start text-xl md:text-2xl font-bold">
                                    {card.title}
                                </h1>
                                <p className="text-start text-white-100 font-semibold mt-3">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    </Button>
                ))}
            </div>
    </div>
  )
}

export default Experience