
import { useState } from "react"
import { Sparkle } from "lucide-react";
import { Link } from "react-router-dom";
import login from "../assets/LogIN.png"

// logo should be therenext to ClickyDrop
export const Signin = () => {
    const [password,setpassword] = useState('');
    const [username,setusername] = useState("");

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log("Signup submitted:", { username, password });
        // Add your signup logic here
    };

    return (
        <>
        <div className="min-h-screen bg-white text-white flex 
        items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-6xl mx-auto bg-white text-black 
            rounded-3xl shadow-2xl overflow-hidden 
            grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side: Signup Form */}
                <div className="flex flex-col p-8 sm:p-12 lg:p-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8 sm:mb-12">
                        <Sparkle className="text-indigo-400" size={32} />
                        <span className="text-3xl font-bold ">ClickyDrop</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold 
                     mb-4 animate-fade-in">
                        LogIn to your ClickyDrop Manage your links
                        & customize your profile 
                    </h1>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 
                    flex flex-col mt-10 text-black">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full py-3 
                            text-lg font-semibold text-[#A8AAA2] 
                            bg-[#161615] 
                            hover:text-white
                            hover:bg-indigo-700 transition-all duration-300 rounded-lg shadow-lg transform hover:scale-105"
                        >
                            Sign In
                        </button>
                    </form>
                    
                    {/* Note to the user */}
                    <div className="text-center mt-6">
                        <span className="text-gray-400">
                           Don't have an account?  
                           <Link to={"/signup"}
                           className="text-[#8129D9]"
                           >SignUp</Link>
                        </span>
                    </div>
                </div>

                {/* Right Side: Image Collage */}
                <div className="lg:flex p-6 bg-indigo-900 items-center justify-center relative">
                    <div className="w-full h-full rounded-2xl overflow-hidden
                     shadow-xl transform scale-95 transition-transform duration-500">
                        <img
                            src={login}
                            alt="App preview collage"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}