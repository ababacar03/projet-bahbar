"use client";

import { useEffect, useState } from "react";
import Footer from "./footer";

export default function FooterClient() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLogged(!!token);
    }, []);

    if (!isLogged) {
        return null;
    }

    return <Footer />;
}