import { JSX } from "react";
type IconName = "arrowright";

export default function Icon({ name }: { name: IconName }) {
  const icons: Record<IconName, JSX.Element> = {
    arrowright: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 h-7 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

    ),
  };

  if (!(name in icons)) {
    throw new Error(`Icon "${name}" does not exist.`);
  }

  return icons[name];
}