/*code the navigation bar icon  */
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
        <section className=" w-full font-inter px-6 py-4 
        flex justify-between items-center
         bg-white shadow-sm border-b border-gray-100 border-1
         rounded-full  ml-2 mr-4
         fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ">

                <div className="flex justify-start gap-7 text-[#15px]">
                    <div className=" font-bold text-black">
                    ClickyDrop<span className="text-green-500">✳</span>
                    </div>
                    <div className="text-[#676B5F] hover:text-black">Home</div>
                    <div className="text-[#676B5F] hover:text-black">Testimonials</div>
                    <div className="text-[#676B5F] hover:text-black">FAQ</div>
                    <div className="text-[#676B5F] hover:text-black">About Us</div>
                </div>

                <div className="flex items-center gap-3 text-[#16px]">
                    <Link to={"/signup"}>
                    <Button className="
                    bg-[#ffffff] p-4 font-semibold text-black 
                    border-[oklch(27.8% 0.033 256.848)]
                     rounded-full border-1 hover:bg-[#e0e2d9]
                     hover:text-black">Sign Up</Button>
                    </Link>
                    <Link to={"signin"}>
                    <Button className="
                    bg-[#ffffff] p-4 rounded-full border-1
                    border-[oklch(27.8% 0.033 256.848)] 
                    hover:bg-[#e0e2d9]
                    font-semibold text-black ">Sign In</Button>
                    </Link>

                </div>
        </section>
        </>
    )
}