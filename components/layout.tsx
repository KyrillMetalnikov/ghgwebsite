import HomeNavBar from "./navbar";
import Footer from "./footer";
import React, { ReactNode } from "react";


export default function Layout({children}: { children: ReactNode}) {
    return(
        <>
            <HomeNavBar/>
                <main>{children}</main>
            <Footer/>
        </>
    )
}