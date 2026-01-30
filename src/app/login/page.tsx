"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const Page = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createSupabaseBrowserClient();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
        })
        if (error) {
            setError(error.message);
        } else {
            router.push('/dashboard');
        }
        setLoading(false);
    }

    const handleDemoLogin = async () => {
        // TODO
    };

    // TODO: currently the password is not in encrypted form and we can see it in the network tab

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center flex-col gap-6">
            <h1 className="text-white text-2xl font-bold">HireTrack</h1>
            <div className="bg-amber-50 p-4 rounded-lg shadow-md max-w-sm w-full">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>

            <div className="flex gap-4">
                <button disabled={loading} className="bg-blue-500 text-white p-2 rounded-md cursor-pointer" onClick={handleLogin}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <button disabled={loading} className="bg-blue-500 text-white p-2 rounded-md cursor-pointer" onClick={handleDemoLogin}>
                    Demo Login (Test User)
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

        </div>
    );
};

export default Page;