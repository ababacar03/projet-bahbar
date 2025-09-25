"use client";

import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function NavbarClient() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLogged(!!token);
    }, []);

    if (!isLogged) return null;

    return <Navbar bg="dark" variant="dark" />;
}
