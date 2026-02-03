import { JSX } from "react";
type IconName = "arrowright" | "share" | "moon"  | "sun" | "copy" | "google";

export default function Icon({ name }: { name: IconName }) {
  const icons: Record<IconName, JSX.Element> = {
    arrowright: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 h-7 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    ),
    share: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
        </svg>
    ),
    moon:(
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
    ),
    sun:(
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    copy:(
      <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.333 8.533h-8.25a1.834 1.834 0 0 0-1.833 1.834v8.25c0 1.012.82 1.833 1.833 1.833h8.25c1.013 0 1.834-.82 1.834-1.834v-8.25a1.834 1.834 0 0 0-1.834-1.833" stroke="#B7C4B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.583 14.034h-.917A1.833 1.833 0 0 1 1.833 12.2V3.95a1.833 1.833 0 0 1 1.833-1.833h8.25a1.833 1.833 0 0 1 1.834 1.834v.916" stroke="#B7C4B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    ),
    google:(
      <svg className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.61l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.1 24.5c0-1.63-.15-3.2-.43-4.72H24v9.02h12.38c-.54 2.9-2.17 5.36-4.6 7.01l7.06 5.49c4.13-3.81 6.26-9.42 6.26-16.8z"/>
        <path fill="#FBBC05" d="M10.54 28.41c-.48-1.45-.76-2.99-.76-4.41s.27-2.96.76-4.41l-7.98-6.19C.92 16.61 0 20.23 0 24s.92 7.39 2.56 10.6l7.98-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.06-5.49c-1.96 1.32-4.47 2.09-8.84 2.09-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    )
  };

  if (!(name in icons)) {
    throw new Error(`Icon "${name}" does not exist.`);
  }

  return icons[name];
}