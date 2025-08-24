"use client";
import { signIn, signOut } from "next-auth/react";
export const doSignIn = () => signIn("google");
export const doSignOut = () => signOut();
