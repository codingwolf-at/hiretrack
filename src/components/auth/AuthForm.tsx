"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, LogIn, Mail, MailCheck, UserPlus, Zap } from "lucide-react";
// types
import { AuthModeTypes } from "@/types/auth";
// constants
import { AUTH_FORM_STRINGS, AUTH_MODES, DEMO_LOGIN_CREDS, SIGNUP_CONFIRMATION_STRINGS } from "@/constants/ui";
// helpers
import { createSupabaseBrowserClient } from "@/lib/supabase/supabaseClient";
// components
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

const AuthForm = ({ mode }: { mode: AuthModeTypes }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [demoLoggingIn, setDemoLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [confirmationSent, setConfirmationSent] = useState(false);

    const router = useRouter();
    const supabase = createSupabaseBrowserClient();

    const isLogin = mode === AUTH_MODES.LOGIN;
    const pageStrings = AUTH_FORM_STRINGS[mode];

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
        });
        if (error) {
            setError(error.message);
        } else {
            router.refresh();
            router.push('/dashboard');
        }
    };

    const handleSignup = async () => {
        const { error } = await supabase.auth.signUp({
            email: email.trim(),
            password: password.trim(),
            options: {
                emailRedirectTo: `${window.location.origin}/login`,
            },
        });
        if (error) {
            setError(error.message);
        } else {
            setConfirmationSent(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        if (isLogin) {
            await handleLogin();
        } else {
            await handleSignup();
        }
        setSubmitting(false);
    };

    const handleDemoLogin = async () => {
        setDemoLoggingIn(true);
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: DEMO_LOGIN_CREDS.EMAIL,
            password: DEMO_LOGIN_CREDS.PASSWORD
        });
        if (error) {
            setError(error.message);
        } else {
            router.refresh();
            router.push('/dashboard');
        }
        setDemoLoggingIn(false);
    };

    // TODO: currently the password is not in encrypted form and we can see it in the network tab

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
                        {pageStrings.switchPrompt}{' '}
                        <Link href={pageStrings.switchRoute} className="text-accent hover:text-accent/80 font-medium transition-colors">
                            {pageStrings.switchCTA}
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="rounded-xl bg-card border border-border p-8 space-y-6">

                        {confirmationSent ? (
                            <div className="space-y-4 text-center">
                                <div className="mx-auto w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                                    <MailCheck className="w-6 h-6 text-accent" />
                                </div>
                                <h1 className="text-2xl font-bold text-foreground text-balance">{SIGNUP_CONFIRMATION_STRINGS.TITLE}</h1>
                                <p className="text-muted-foreground text-sm">
                                    {SIGNUP_CONFIRMATION_STRINGS.DESCRIPTION}
                                </p>
                                <Link href="/login" className="inline-block text-accent hover:text-accent/80 font-medium text-sm transition-colors">
                                    Back to sign in
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold text-foreground text-balance">{pageStrings.heading}</h1>
                                    <p className="text-muted-foreground text-sm">
                                        {pageStrings.subHeading}
                                    </p>
                                </div>

                                <form className="space-y-4" onSubmit={handleSubmit}>
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
                                                disabled={submitting || demoLoggingIn}
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
                                                disabled={submitting || demoLoggingIn}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                                        loading={submitting}
                                        disabled={demoLoggingIn || !email.trim().length || !password.trim().length}
                                    >
                                        {isLogin
                                            ? <LogIn className="w-4 h-4 mr-2" />
                                            : <UserPlus className="w-4 h-4 mr-2" />}
                                        {pageStrings.mainCTA}
                                    </Button>
                                </form>

                                {isLogin && (
                                    <>
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
                                            disabled={submitting}
                                            loading={demoLoggingIn}
                                        >
                                            <Zap className="w-4 h-4 mr-2" />
                                            Demo login
                                        </Button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    {error && (
                        <p className="text-destructive mt-4 text-center">{error}</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AuthForm;
