import Link from "next/dist/client/link";

export default function HomeNavBar() {
    return(
        <div className="navbar">
            <Link href="/" className="navbar-brand">Home</Link>
            <Link href="/standings" className="nav-item">Standings</Link>
            <Link href="/roster" className="nav-item">Roster</Link>
            <Link href="/schedule" className="nav-item">Schedule</Link>
        </div>
    )
}