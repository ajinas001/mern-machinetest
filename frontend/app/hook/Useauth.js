'use client'

import { useEffect } from "react";
import { useRouter } from "next/router";
import { verifyToken } from "../Util/auth";


const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await verifyToken();
      if (response.success && response.data) {
        console.log(response); // Token is valid
      } else {
        router.push("/"); // Redirect to login if token is invalid
        alert("Token verification failed! Please login again.");
      }
    };

    fetchData();
  }, [router]); // Ensure the router is updated if it changes
};

export default useAuth;
