"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, LogIn, Mail, Zap } from "lucide-react";
// constants
import { DEMO_LOGIN_CREDS } from "@/constants/ui";
// helpers
import { createSupabaseBrowserClient } from "@/lib/supabase/supabaseClient";
// components
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

const Page = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [demoLoggingIn, setDemoLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createSupabaseBrowserClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoggingIn(true);
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
        setLoggingIn(false);
    }

    const handleDemoLogin = async () => {
        setDemoLoggingIn(true);
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: DEMO_LOGIN_CREDS.EMAIL,
            password: DEMO_LOGIN_CREDS.PASSWORD
        })
        if (error) {
            setError(error.message);
        } else {
            router.push('/dashboard');
        }
        setDemoLoggingIn(false);
    };

    // TODO: currently the password is not in encrypted form and we can see it in the network tab
    // TODO: currently if i am logged in and go to route /login it should redirect me to dashboard

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <span className="text-lg font-semibold text-foreground">HireTrack</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        {/* TODO instead of link use the same UI with flag */}
                        <Link href="/signup" className="text-accent hover:text-accent/80 font-medium transition-colors">
                            Sign up
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="rounded-xl bg-card border border-border p-8 space-y-6">

                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-foreground text-balance">Welcome back</h1>
                            <p className="text-muted-foreground text-sm">
                                Sign in to your account to continue tracking your job search
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => handleLogin(e)}>
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                                        disabled={loggingIn || demoLoggingIn}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                                        disabled={loggingIn || demoLoggingIn}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                                loading={loggingIn}
                                disabled={demoLoggingIn || !email.trim().length || !password.trim().length}
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Sign in
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-card text-muted-foreground">Or try demo</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleDemoLogin}
                            disabled={loggingIn}
                            loading={demoLoggingIn}
                        >
                            <Zap className="w-4 h-4 mr-2" />
                            Demo login
                        </Button>
                    </div>
                    {error && (
                        <p className="text-destructive mt-4 text-center">{error}</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Page;