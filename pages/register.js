import React, { useState } from 'react';
import Image from 'next/image'
import logo from '../public/RIMDB-logos_transparent.png'
import { signIn, signOut, useSession, jwt } from 'next-auth/client'
import { useRouter } from 'next/router';

function registerUser(event, name, password, session) {
    event.preventDefault();
    const user = signIn('credentials', { name, password });

}

export default function Register() {
    const [session, loading] = useSession()
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    if (session) {
        router.push("/");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        </div >

    );
}