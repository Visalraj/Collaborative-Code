"use client";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import type * as monaco from "monaco-editor";
import Icon from "../components/icons";
import Modal from "../components/modal";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export default function CodeEditor({ slug }: { slug: string }) {
    const roomId = slug;

    const socketRef = useRef<Socket | null>(null);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const changeDisposableRef = useRef<monaco.IDisposable | null>( null,);

    const applyingRemoteRef = useRef(false);
    const versionRef = useRef(0);

    const [status, setStatus] = useState("connecting...");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const socket = io(SOCKET_URL, { transports: ["websocket"] });
        socketRef.current = socket;

        socket.on("connect", () => setStatus("connected"));
        socket.on("disconnect", () => setStatus("disconnected"));

        return () => {
            // cleanup socket + editor listeners
            changeDisposableRef.current?.dispose();
            changeDisposableRef.current = null;

            socket.removeAllListeners();
            socket.disconnect();
            socketRef.current = null;
        };
       
    }, []);

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
        if (theme === "light") 
            document.body.classList.add("dark-theme"); 
        else 
            document.body.classList.remove("dark-theme"); 
    }

    const toogleShareModal = () => {
        setModalOpen((prev) => !prev);
    }

    function onMount(editor: monaco.editor.IStandaloneCodeEditor) {
        editorRef.current = editor;

        const socket = socketRef.current;
        if (!socket) return;
        if (!roomId) return;

        // Avoid duplicate handlers (HMR / strict mode)
        socket.off("doc-init");
        socket.off("doc-update");

        // Join room
        socket.emit("join-room", { roomId });

        socket.on("doc-init", ({ text, version }) => {
            applyingRemoteRef.current = true;
            editor.setValue(text ?? "");
            versionRef.current = version ?? 0;
            applyingRemoteRef.current = false;
        });

        socket.on("doc-update", ({ text, version }) => {
            applyingRemoteRef.current = true;
            editor.setValue(text ?? "");
            versionRef.current = version ?? versionRef.current;
            applyingRemoteRef.current = false;
        });

        // Dispose old change listener if it exists (important for HMR)
        changeDisposableRef.current?.dispose();

        // Listen for local edits
        changeDisposableRef.current = editor.onDidChangeModelContent(
            () => {
                if (applyingRemoteRef.current) return;

                socket.emit("doc-update", {
                    roomId,
                    text: editor.getValue(),
                    version: versionRef.current,
                });
            },
        );
    }
    function onChange(value?: string) {
        const socket = socketRef.current;
        if (!socket || !roomId) return;
        if (applyingRemoteRef.current) return;

        // value here is the FULL document text
        socket.emit("doc-update", { roomId, text: value ?? "" });
    }


    return (
        <>
            <div className="wrap-buttons flex justify-end gap-4 mr-12 py-2">
                {/*<span className="opacity-70 text-sm">
                    Socket: {status}
                </span> */}
                <button
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 w-36 rounded-full border border-black/20 text-black font-medium hover:bg-black/5 transition-all duration-200 cursor-pointer"
                    onClick={() => toogleShareModal()}
                >
                    <Icon name="share" />
                    <span>Share</span>
                </button>

                <button
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 w-36 rounded-full border border-black/20 text-black font-medium hover:bg-black/5 transition-all duration-200 cursor-pointer"
                    onClick={() => changeTheme()}
                >
                    {theme == "light" ? (
                        <Icon name="sun" />
                    ) : (
                        <Icon name="moon" />
                    )}
                    <span>Theme</span>
                </button>
            </div>

            <div className="wrapcodeeditor w-full">
                <Editor
                    height="90vh"
                    defaultLanguage="javascript"
                    defaultValue=""
                    theme={theme === "light" ? "vs-dark" : "vs-light"}
                    onMount={onMount}
                    onChange={onChange}
                    options={{ minimap: { enabled: false } }}
                />
            </div>
            {modalOpen && ( <Modal id={roomId} onClose={() => setModalOpen(prev => !prev)} type={'share'}/>)}
        </>
    );
}
