'use client';
import { useState } from "react";
import Icon from "./icons";
import Modal from "./modal";
export default function Button() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <button className="group border rounded-2xl px-6 py-4 w-fit inline-flex items-center gap-2 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.04]" onClick={()=>setModalOpen((prev)=>!prev)}>Get Started<Icon name="arrowright"/>
            </button>
            {modalOpen && (<Modal id={"123"} onClose={() => setModalOpen(prev => !prev)} type={'signin'}/>)}
        </>

    )
}