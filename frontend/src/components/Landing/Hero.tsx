import React from "react";

import { Button } from "@/components/ui/button";
import { Navbar } from "./Navigation";
import cta from "../../assets/landingcta.png"
import { Testimonials } from "./Testimonials";
import { useNavigate } from "react-router-dom";
export const Hero = () => {
    const navigate = useNavigate();
    
    return (
        <>
        <div className="bg-gradient-to-r from-[#F8FAFC] to-[#E0F7FA] mt-5">
         <Navbar />
             <section className="grid md:grid-cols-2 items-center min-h-[80vh] py-12 px-6 ">
             <div className="ml-[50px] ">
                 <h1 className="text-[85px] leading-tight text-[#126BF1]">Everything <br /> you are. One <br/> link to rule 
                 <br/> them all.</h1>
                 <p className="text-[#126BF1] mt-4 text-lg">ClickyDrop lets you organize your links, promote your content,<br/>
                  and grow your brand  - all from one beautiful page. </p>
                  <div className="flex mt-4 gap-3 ">
                     <div className="bg-white text-[#676B5F] p-2 rounded-full text-center">
                         clickydrop/:yourusername
                     </div>
                     <Button className=" text-lg 
                     rounded-full shadow-md bg-[#E9C0E9] text-[#oklch(70.8% 0 0)] hover:bg-[oklch(65.6% 0.241 354.308)]
                     hover:text-white"
                     onClick={() => navigate("/signin")}
                     >Get Started for Free</Button>
                  </div>
             </div>
             <div className="mt-10 md:mt-0">
                 <div className="ml-60">
                     <img src={cta} className="border border-back rounded-xl
                     "/>
                 </div>
             </div>
         </section>
     </div>
         <Testimonials />
     
         </>
     
    )
};
