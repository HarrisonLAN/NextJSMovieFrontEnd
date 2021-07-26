import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import Image from 'next/image'
import logo from '../public/RIMDB-logos_transparent.png'
export default function Header() {
    const [session, loading] = useSession()

    return (
        
        <header>
            <nav className="bg-white shadow-lg">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div className="hidden md:flex items-center space-x-1">
							<a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
							<a href="/movies" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Movies</a>
							<a href="/account" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Account</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
        </header>
    )
}