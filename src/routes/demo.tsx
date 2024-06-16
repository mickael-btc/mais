import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/demo")({
    component: Demo,
});

function Demo() {
    const [image, setImage] = useState(null);

    // fetch server every 1s
    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://0.0.0.0:8000/").then((res) => {
                console.log("coucou");
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-red-500 h-screen w-screen">
            {image && <img src={image} />}
        </div>
    );
}
