import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/demo")({
    component: Demo,
});

function Demo() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const socket = new WebSocket("ws://10.68.249.219:65432");

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onmessage = (event) => {
            // const data = event.data;
            // if (data instanceof Blob) {
            //     const url = URL.createObjectURL(data);
            //     setImage(url);
            // }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        const handleKeyDown = (event: any) => {
            // socket.send(JSON.stringify({ type: "keyEvent", key: event.key }));
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            socket.close();
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="bg-red-500 h-screen w-screen">
            {image && <img src={image} />}
        </div>
    );
}
