import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";

export default function Antrian({ poliId }) {
    console.log("ANTRIAN COMPONENT RENDERED");
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        console.log("Subscribing to channel:", `queue-screen.${poliId}`);

        const channel = Echo.channel(`queue-screen.${poliId}`)
            .listen(".QueueUpdated", (e) => {
                console.log("QUEUE UPDATED:", e);
                setCurrent(e.queue);
            })
            .error((error) => {
                console.error("Echo error:", error);
            });

        // Log connection status
        Echo.connector.pusher.connection.bind("connected", () => {
            console.log("WebSocket connected!");
        });

        Echo.connector.pusher.connection.bind("disconnected", () => {
            console.log("WebSocket disconnected!");
        });

        Echo.connector.pusher.connection.bind("error", (err) => {
            console.error("WebSocket error:", err);
        });

        return () => {
            console.log("Leaving channel:", `queue-screen.${poliId}`);
            Echo.leave(`queue-screen.${poliId}`);
        };
    }, [poliId]);

    return (
        <>
            <Head title="Screen Antrian" />

            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#0f172a",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <div style={{ fontSize: "32px" }}>NOMOR DIPANGGIL</div>

                <div style={{ fontSize: "96px", fontWeight: "bold" }}>
                    {current ? current.queue_number : "-"}
                </div>

                <div style={{ fontSize: "24px", opacity: 0.7 }}>
                    Status: {current ? current.status : "-"}
                </div>
            </div>
        </>
    );
}
