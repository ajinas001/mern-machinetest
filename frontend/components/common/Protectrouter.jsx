'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from Next.js
import { verifyToken } from "../api"; // Import the API function

const ProtectedRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            // Instead of using js-cookie, the cookie is automatically sent with the request from the browser
            const result = await verifyToken(); // Verify the token from the backend
            if (result.success) {
                setIsAuth(true);
            } else {
                setIsAuth(false); // Invalid token or expired
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading spinner while checking authentication
    }

    // If not authenticated, redirect to the login page
    if (!isAuth) {
        router.push("/"); // Redirect to home or login page
        return null; // Don't render anything while redirecting
    }

    return children; // If authenticated, render children (protected content)
};

export default ProtectedRoute;
