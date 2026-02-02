import { useState } from "react";
import Icon from "./icons"
export default function CopyModal({id, onClose }: { id:string, onClose: () => void }) {
    const [copied, setCopied] = useState(false);
    const link = `${process.env.NEXT_PUBLIC_DYNAMICLINK}room/${id}`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return(
        <>
            {/* Background overlay (modal backdrop)*/}
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"  onClick={onClose} aria-hidden="true"/>


            <div id="default-modal" tabIndex={-1}  className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                            <h3 className="text-lg font-medium text-heading">
                                Share Now
                            </h3>
                            <button type="button" onClick={onClose} className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-2xl bg-neutral-100 px-5 py-1 border-0">
                            <p className="text-sm text-neutral-400 truncate">{link}</p>
                            <button  className="flex items-center justify-center rounded-lg p-2 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 transition cursor-pointer" aria-label="Copy link" onClick={handleCopy}>
                                <Icon name="copy" />
                            </button>
                        </div>
                        {copied && ( <p className="text-xs text-black text-center">Copied to clipboard</p> )}
                    </div>

                </div>
            </div>
        </>
    )
}