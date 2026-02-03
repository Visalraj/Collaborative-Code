import Button from "../components/button";
import randomUuidGenerator from "../components/common";
export default function Banner() {
    const randomUuid = randomUuidGenerator();
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
                    <Button/>
                </div>
            </div>
        </>
    );

}