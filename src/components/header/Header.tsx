import { Container } from "@/content/Content";
import Link from "next/link";

export default function Header() {
    return (
        <header className="h-20 w-full grid sticky top-0 left-0 bg-white/75 backdrop-blur-sm z-20">
            <Container className="h-full w-full flex flex-wrap justify-between gap-4 border-b-[1px] items-center">
                <Link href="/">Shopping</Link>

                <nav className="flex gap-4">
                    <Link href='/'>Home</Link>
                    <Link href='/contact'>Contact</Link>
                </nav>
            </Container>
        </header>
    )
}