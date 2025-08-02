import { useState } from "react";
import { ArrowUp,ArrowDown } from "lucide-react";


const testimonials = [
    {
        "id":1,
        'question':"What is clickyDrop?",
        "answer":"",
    },
    {
        "id":2,
        'question':"Is my data safe in the clickyDrop?",
        "answer":"",
    },
    {
        "id":3,
        'question':"Is clickyDrop open source",
        "answer":"",
    },
    {
        "id":4,
        'question':"Is clickyDrop safe to use on all of my social media profiles",
        "answer":"",
    },
]


export const Testimonials = () => {

    // current testimonial index and set the testimonial index
    const [testindex,settestindex] = useState<Number | null>(null);

    const toggleindex = (id:number) => {
        settestindex(testindex==id ? null : id )
    }
    return (
        <>
        <section id="faqs" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="text-[#615959] text-[30px]">
                    FAQ
                </div>
                <div className="text-[#615959] text-[30px]">
                    Got questions? We have answers!
                </div>
            </div>

            <div className="text-center mx-auto mt-2">
                {testimonials.map((testimonial) => {
                    return (
                        <>
                        <div key={testimonial.id} className="bg-[#EB274A] text-[#E7D6D6]
                        border-white border-1 rounded-full m-4 ">
                            <button className="w-full p-6 flex justify-between items-center 
                            
                            "
                            onClick={() => toggleindex(testimonial.id)}>
                            <h3 className="font-semibold 
                                     pr-4 text-[22px]">
                                        {testimonial.question}
                            </h3>
                            <div>
                            {testindex === testimonial.id ? (
                                            <ArrowUp className="w-5 h-5 text-[#E7D6D6] flex-shrink-0" />
                                        ) : (
                                            <ArrowDown className="w-5 h-5 text-[#E7D6D6] flex-shrink-0" />
                                        )}
                            {testindex === testimonial.id && (
                                <div className='overflow-hidden'>
                                    <div className='px-6 pb-6'>
                                        <div 
                                        className="pt-4 border-t border-white-1"
                                        >
                                            <p className="text-[22px] leading-relaxed">
                                                {testimonial.answer}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ) }
                            </div>
                            </button>
                        </div>
                        </>
                    )
                })}
            </div>

        </section>
        
        </>
    )
}