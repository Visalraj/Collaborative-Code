import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN =
    process.env.CLIENT_ORIGIN || "http://localhost:3000";

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: CLIENT_ORIGIN,
        methods: ["GET", "POST"],
    },
});

// In-memory doc store: roomId -> { text, version }
const docs = new Map();

function getOrCreateDoc(roomId) {
    if (!docs.has(roomId)) {
        docs.set(roomId, {
            text: "// Start coding...\n",
            version: 0,
        });
    }
    return docs.get(roomId);
}

io.on("connection", (socket) => {
    socket.on("join-room", ({ roomId }) => {
        socket.join(roomId);

        const doc = getOrCreateDoc(roomId);

        // ONLY send current state to the new user
        socket.emit("doc-init", {
            text: doc.text,
            version: doc.version,
        });
    });

    // when any user edits
    socket.on("doc-update", ({ roomId, text }) => {
        const doc = getOrCreateDoc(roomId);

        doc.text = text;
        doc.version += 1;

        // broadcast to EVERYONE in the room (including sender)
        io.to(roomId).emit("doc-update", {
            text: doc.text,
            version: doc.version,
        });
    });
});



server.listen(PORT, () => {
    console.log(
        `✅ Socket server running on http://localhost:${PORT}`,
    );
    console.log(`✅ Allowing client origin: ${CLIENT_ORIGIN}`);
});
