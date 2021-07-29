import React, { useState } from 'react';
import Image from 'next/image'
import logo from '../public/RIMDB-logos_transparent.png'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import User from './api/user/user';
import Layout from '../components/layout';

async function registerUser (event, name, password, email) {
    event.preventDefault();
    const res = await User.registeruser({ name, password, email });
    if(res){
        alert("Account Created");
    }else{
        alert("Account failed");
    }
}

export default function Register() {
    const [session, loading] = useSession()
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    if (session) {
        router.push("/");
    }
    return (
        <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Image className=" mx-auto h-auto w-auto" src={logo} alt="Logo" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register a new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        {' '}
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Login Now!
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(event) => registerUser(event, username, password, email)}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required="" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="username" value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input id="email" name="email" type="text" autoComplete="email" required="" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required="" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={!validateForm()} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register now
                        </button>
                    </div>
                </form>
            </div>
        </div >
        </Layout>

    );
}