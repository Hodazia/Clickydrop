import { useState } from "react"

import { X } from "lucide-react"
import QRCode from "react-qr-code"
import toast, { Toaster } from 'react-hot-toast';

interface modalProps {
    isOpen:boolean, // whether the current modal is open or not,
    onClose:()=>void, // a function? or a boolean
    profileURL:string //the url of the show website
}

// the above modal props will be passed from the parent component,
// 
export const CopytoModal = ({isOpen, onClose, profileURL}:modalProps) => {

    if(!isOpen)
    {
        return null;
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(profileURL);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
            toast.error("Failed to copy link. Please try again or copy manually.");
        }

    }

    return (
        <>
        <Toaster position="top-right"/>
        <div className="fixed inset-0 z-50 flex items-center
         justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-3xl shadow-2xl relative w-full max-w-sm mx-4 transform transition-all duration-300 scale-100">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                </button>
                <div className="flex flex-col items-center space-y-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Share Your Profile</h2>
    
                    {/* QR Code */}
                    <div className="bg-gray-100 p-4 rounded-xl shadow-inner">
                    <QRCode
                        value={profileURL}
                        size={200}
                        className="rounded-lg"
                    />
                    </div>

                    {/* Profile URL */}
                    <div className="w-full">
                        <div className="bg-gray-100 p-3 rounded-xl border border-gray-200 text-gray-600 truncate text-sm">
                            {profileURL}
                        </div>
                    </div>

                    {/* Copy and Share Button */}
                    <button
                        onClick={copyToClipboard}
                        className="w-full py-3 bg-indigo-600 
                        text-white font-semibold rounded-xl 
                        hover:bg-indigo-700 transition-colors shadow-lg"
                    >
                        Copy and Share Link
                    </button>
                    </div>
                </div>
             </div>
        </>
    )
}