"use client"
import { useState } from "react";
import Icon from "./icons"
import { handleSignIn, handleSignOut } from "../lib/auth";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";


export default function Modal({id, onClose,type }: { id:string, onClose: () => void,type: 'share' | 'signin' }) {
   
    const [copied, setCopied] = useState(false);
    const link = `${process.env.NEXT_PUBLIC_DYNAMICLINK}room/${id}`;
    
    const handleCopy = async () => {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const { data: session } = useSession();

    return type === "share" ? (
        <>
            {/* Background overlay (modal backdrop)*/}
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose}  aria-hidden="true"/>

            <div id="default-modal"  tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40" >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                            <h3 className="text-lg font-medium text-heading">
                                Share Now
                            </h3>
                            <button  type="button"  onClick={onClose} className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                <svg  className="w-5 h-5"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                                    <path stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"  />
                                </svg>
                                <span className="sr-only">
                                    Close modal
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-2xl bg-neutral-100 px-5 py-1 border-0">
                            <p className="text-sm text-neutral-400 truncate">
                                {link}
                            </p>
                            <button className="flex items-center justify-center rounded-lg p-2 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 transition cursor-pointer"  aria-label="Copy link"  onClick={handleCopy} >
                                <Icon name="copy" />
                            </button>
                        </div>
                        {copied && ( <p className="text-xs text-black text-center"> Copied to clipboard  </p>)}
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"  onClick={onClose} aria-hidden="true"  />

            <div   id="crypto-modal" tabIndex={-1}  aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto" >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                            <h3 className="text-lg font-medium text-heading">
                                Get Started
                            </h3>
                            <button type="button" onClick={onClose} className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crypto-modal" >
                                <svg className="w-5 h-5"  aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="24"  height="24" fill="none" viewBox="0 0 24 24" >
                                    <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                                <span className="sr-only">
                                    Close modal
                                </span>
                            </button>
                        </div>
                        <div className="pt-4 md:pt-6">
                            {session && session.user ? (
                                <div>
                                    <h2 className="text-lg font-medium text-gray-700">
                                        Welcome, {session.user.name}!
                                    </h2>
                                    <button onClick={handleSignOut} className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600" >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <ul className="my-6">
                                    <li className="flex flex-col items-center gap-5">
                                        <button onClick={handleSignIn}  className="flex w-60 items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-medium text-gray-800 shadow-sm transition-all hover:shadow-md hover:bg-gray-50 active:scale-[0.98]"  >
                                            <Icon name="google" />
                                            <span>
                                                Sign in with Google
                                            </span>
                                        </button>
                                        <button onClick={() => signIn("github") }className="flex w-60 items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-medium text-gray-800  shadow-sm transition-all  hover:shadow-md hover:bg-gray-50 active:scale-[0.98]" >
                                            <Icon name="github" />
                                            <span>
                                                Sign in with Github
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}