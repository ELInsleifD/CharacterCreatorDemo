import Link from "next/link"
import classes from "./NavBar.module.css"

export default function NavBar(){
    return (
        <header className={classes.header}>
            <div className={classes.title}>Character App</div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">SHOW ALL CHARACTERS</Link>
                    </li>
                    <li>
                        <Link href="/new-char">CREATE NEW</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}