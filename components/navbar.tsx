import Link from "next/link";

export default function Navbar() {
    return(
        <>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/schedule">Schedule</Link></li>
                <li><Link href="/roster">Roster</Link></li>
                <li><Link href="/standings">Standings</Link></li>
            </ul>
        </>
    )
}