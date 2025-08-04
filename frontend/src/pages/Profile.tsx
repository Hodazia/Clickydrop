import { NavBarUser } from "@/components/User/Navbar"


// a username, email and avatarurl about the user
// and then a feedback form to accept requests and send
// them back to the admin's email
/*
have a nodemailer in the backend to accept the feedback form
and send a mail back to the user accepting their feedback , acknowledging


*/
import React, { useState, useEffect } from "react";

import { BACKEND_URL } from "@/utils/schema";
import toast, { Toaster } from "react-hot-toast";

// 
interface User {
    username: string;
    email: string;
    avatarUrl: string;
}

export const ProfileDashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch the  data from the backend API- /me
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/me`, {
                    method:'GET',
                    credentials: 'include', // Ensuring cookies are sent
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                console.log("The data from the API is ", data);
                setUser(data.user);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load user profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Handle feedback form submission
    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim()) {
            toast.error("Feedback cannot be empty.");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading('Sending feedback...');

        try {
            const response = await fetch(`${BACKEND_URL}/send-feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email,
                    query: feedback
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to send feedback.");
            }

            toast.success("Thank you for your feedback! Check your email for a confirmation.", { id: toastId });
            setFeedback("");
        } catch (error: any) {
            toast.error(error.message || "Failed to send feedback.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center 
        min-h-screen text-gray-500">Loading profile...</div>;
    }
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <Toaster position="top-right" />
            <NavBarUser />
            <div className="flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 w-full max-w-2xl text-center mt-12">
                    {/* User Profile Section */}
                    {user && (
                        <>
                            <img
                                src={user.avatarUrl || 'https://placehold.co/200x200/4f0f69/fff?text=Avatar'}
                                alt={`${user.username}'s avatar`}
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 mx-auto mb-4"
                            />
                            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{user.username}</h2>
                            <p className="text-gray-500 text-lg">{user.email}</p>
                        </>
                    )}

                    {/* Feedback Form Section */}
                    <div className="mt-12 w-full">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Give Us Your Feedback</h3>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <textarea
                                className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                placeholder="Your feedback..."
                                rows={5}
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl 
                                           hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
