import Link from "next/link"
import { ModeToggle } from "./ModeToggle";


export default function Navbar() {
    return (
        <nav className=" w-full relative flex items-center justify-between max-w px-5 py-5">                       
            <Link className="font-bold text-3xl " href="/">
                Vincent<span className="text-primary ">Blog</span>
            </Link>
            <ModeToggle />             
        </nav>
    );
}