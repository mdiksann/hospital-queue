import React, { useEffect, useState } from "react"

export default function QueueScreen() {
    const [queue, setQueue] = useState(null)

    useEffect(() => {
        window.Echo
            .channel("hospital-queue")
            .listen(".queue.updated", (e) => {
                console.log("Realtime update:", e)
                setQueue(e.queue)
            })

        return () => {
            window.Echo.leave("hospital-queue")
        }
    }, [])

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4">
                Hospital Queue Screen
            </h1>

            {queue ? (
                <div className="text-xl">
                    <p>No Antrian: <b>{queue.queue_number}</b></p>
                    <p>Status: <b>{queue.status}</b></p>
                </div>
            ) : (
                <p>Menunggu antrian...</p>
            )}
        </div>
    )
}