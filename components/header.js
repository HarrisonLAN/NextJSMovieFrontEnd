import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const [session, loading] = useSession()

    return (
        <header>
            {!session && <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </>}
            {session && <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>}
            <nav>
                <div className="container mx-auto">
                    <ul className="flex">
                        <li className="mr-6">
                            <a className="text-blue-500 hover:text-blue-800" href="/movies">Movies</a>
                        </li>
                        <li className="mr-6">
                            <a className="text-blue-500 hover:text-blue-800" href="/account">Account</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}