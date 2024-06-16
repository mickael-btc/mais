import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/demo")({
    component: Demo,
});

function mapKeyToDirection(key: string) {
    switch (key) {
        case "ArrowUp":
            return "FRONT";
        case "ArrowDown":
            return "BACK";
        case "ArrowLeft":
            return "LEFT";
        case "ArrowRight":
            return "RIGHT";
        case " ":
            return "UP";
        case "Shift":
            return "DOWN";
        default:
            return null;
    }
}

function Demo() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const socket = new WebSocket("ws://yourserver.com/path");

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onmessage = (event) => {
            const data = event.data;
            if (data instanceof Blob) {
                const url = URL.createObjectURL(data);
                setImage(url);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        const handleKeyDown = (event) => {
            // socket.send(JSON.stringify({ type: "keyEvent", key: event.key }));
            const direction = mapKeyToDirection(event.key);
            console.log(direction);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            socket.close();
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="bg-white h-screen w-screen">
            {image && <img src={image} />}
        </div>
    );
}
