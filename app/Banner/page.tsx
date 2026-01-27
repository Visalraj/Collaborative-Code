import Link from "next/link";
import Icon from "../components/icons";
export default function Banner() {
    return (
        <>
            <div className="hero-banner m-auto text-center py-48 text-white font-bold">
                <h1 className="hero-title text-6xl">
                    Collaborative Code Editor
                </h1>
                <p className="text-base m-1 p-2">
                    Code together in real time. Build faster, smarter,
                    and from anywhere.
                </p>
                <div className="wrap-btns p-7">
                    <Link href={'/room/123'}>
                        <button className="group border rounded-2xl px-6 py-4 w-fit inline-flex items-center gap-2 cursor-pointer
                   transition-all duration-300 ease-out hover:scale-[1.04]">Create Room <Icon name="arrowright"/></button>
                   </Link>
                </div>
            </div>
        </>
    );

}