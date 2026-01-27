"use client";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import type * as monaco from "monaco-editor";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export default function CodeEditor({ slug }: { slug: string }) {
    const roomId = slug;

    const socketRef = useRef<Socket | null>(null);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const changeDisposableRef = useRef<monaco.IDisposable | null>( null,);

    const applyingRemoteRef = useRef(false);
    const versionRef = useRef(0);

    const [status, setStatus] = useState("connecting...");

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
        <div className="wrapcodeeditor p-8">
            <div className="wrap-buttons flex justify-end mb-4 gap-4 mr-12">
                <span className="opacity-70 text-sm">
                    Socket: {status}
                </span>
                <button>Share</button>
                <button>Theme</button>
            </div>

            <Editor
                height="90vh"
                defaultLanguage="javascript"
                defaultValue=""
                theme="vs-dark"
                onMount={onMount}
                onChange={onChange}
                options={{ minimap: { enabled: false } }}
            />
        </div>
    );
}
