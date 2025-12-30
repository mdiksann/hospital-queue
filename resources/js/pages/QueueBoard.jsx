import React, { useEffect, useState } from "react"

export default function QueueBoard() {
    const [queues, setQueues] = useState({})

    useEffect(() => {
        window.Echo
            .channel("hospital-queue")
            .listen(".queue.updated", (e) => {
                setQueues(prev => ({
                    ...prev,
                    [e.queue.polyclinic_id]: e.queue
                }))
            })

        return () => window.Echo.leave("hospital-queue")
    }, [])

    return (
        <div className="min-h-screen bg-slate-900 text-white p-10">
            <h1 className="text-4xl font-bold text-center mb-10">
                ANTRIAN RUMAH SAKIT
            </h1>

            <div className="grid grid-cols-3 gap-8">
                {Object.values(queues).map(queue => (
                    <div
                        key={queue.polyclinic_id}
                        className="bg-slate-800 rounded-2xl p-8 text-center transition-all duration-300"
                    >
                        <p className="text-xl mb-2">
                            {queue.polyclinic_name}
                        </p>

                        <h2 className="text-[80px] font-bold my-4">
                            {queue.queue_number}
                        </h2>

                        <span
                            className={`px-4 py-2 rounded-full text-lg ${
                                queue.status === 'called'
                                    ? 'bg-green-500'
                                    : 'bg-yellow-500'
                            }`}
                        >
                            {queue.status.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
