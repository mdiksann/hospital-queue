import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";

export default function Dashboard({ polyclinics }) {
    const [selectedPoly, setSelectedPoly] = useState(null);

    useEffect(() => {
        // Listen for real-time queue updates
        window.Echo.channel("hospital-queue").listen(".queue.updated", (e) => {
            console.log("Queue updated in dashboard:", e);
            // Reload data from server
            router.reload({ only: ["polyclinics"] });
        });

        return () => {
            window.Echo.leave("hospital-queue");
        };
    }, []);

    const handleAction = (queueId, action) => {
        router.post(
            `/admin/queue/${queueId}/${action}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Refresh data
                },
            }
        );
    };

    const getStatusColor = (status) => {
        const colors = {
            waiting: "bg-gray-100 text-gray-800 border-gray-300",
            called: "bg-blue-100 text-blue-800 border-blue-300",
            skipped: "bg-yellow-100 text-yellow-800 border-yellow-300",
            done: "bg-green-100 text-green-800 border-green-300",
        };
        return colors[status] || colors.waiting;
    };

    const getStatusText = (status) => {
        const texts = {
            waiting: "Menunggu",
            called: "Dipanggil",
            skipped: "Dilewati",
            done: "Selesai",
        };
        return texts[status] || "Menunggu";
    };

    const filteredQueues = selectedPoly
        ? polyclinics.find((p) => p.id === selectedPoly)?.queues || []
        : polyclinics.flatMap((p) =>
              p.queues.map((q) => ({ ...q, polyclinic: p }))
          );

    return (
        <>
            <Head title="Admin Dashboard - Hospital Queue" />

            <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
                {/* Header */}
                <div className="bg-white shadow-lg border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-blue-600">
                                    Hospital Queue Management
                                </h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Kelola antrian pasien dari berbagai
                                    poliklinik
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">
                                        Total Antrian Hari Ini
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {filteredQueues.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Filter Poliklinik */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Filter Poliklinik
                        </label>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setSelectedPoly(null)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                                    selectedPoly === null
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300"
                                }`}
                            >
                                Semua Poliklinik
                            </button>
                            {polyclinics.map((poly) => (
                                <button
                                    key={poly.id}
                                    onClick={() => setSelectedPoly(poly.id)}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                                        selectedPoly === poly.id
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300"
                                    }`}
                                >
                                    {poly.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Queue Cards Grid */}
                    {filteredQueues.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-lg">
                                Tidak ada antrian untuk hari ini
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredQueues.map((queue) => (
                                <div
                                    key={queue.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                                >
                                    {/* Card Header */}
                                    <div className="bg-blue-600 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white text-sm font-medium opacity-90">
                                                    Nomor Antrian
                                                </p>
                                                <p className="text-white text-4xl font-bold">
                                                    {queue.queue_number}
                                                </p>
                                            </div>
                                            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                                <p className="text-white text-xs font-medium">
                                                    {queue.polyclinic?.name ||
                                                        "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="px-6 py-5">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                                    Nama Pasien
                                                </p>
                                                <p className="text-lg font-semibold text-gray-900 mt-1">
                                                    {queue.patient_name}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-xs text-gray-500 font-medium">
                                                    Status
                                                </span>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                        queue.status
                                                    )}`}
                                                >
                                                    {getStatusText(
                                                        queue.status
                                                    )}
                                                </span>
                                            </div>

                                            {queue.called_at && (
                                                <div className="text-xs text-gray-500">
                                                    <span className="font-medium">
                                                        Dipanggil:
                                                    </span>{" "}
                                                    {new Date(
                                                        queue.called_at
                                                    ).toLocaleTimeString(
                                                        "id-ID"
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-6 space-y-2">
                                            {queue.status === "waiting" && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleAction(
                                                                queue.id,
                                                                "call"
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                                                        </svg>
                                                        Call
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleAction(
                                                                queue.id,
                                                                "skip"
                                                            )
                                                        }
                                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                                                        </svg>
                                                        Skip
                                                    </button>
                                                </div>
                                            )}

                                            {queue.status === "called" && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleAction(
                                                                queue.id,
                                                                "done"
                                                            )
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        Done
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleAction(
                                                                queue.id,
                                                                "skip"
                                                            )
                                                        }
                                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                                                        </svg>
                                                        Skip
                                                    </button>
                                                </div>
                                            )}

                                            {(queue.status === "skipped" ||
                                                queue.status === "done") && (
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            queue.id,
                                                            "reset"
                                                        )
                                                    }
                                                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stats Footer */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Menunggu",
                                count: filteredQueues.filter(
                                    (q) => q.status === "waiting"
                                ).length,
                                color: "gray",
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                label: "Dipanggil",
                                count: filteredQueues.filter(
                                    (q) => q.status === "called"
                                ).length,
                                color: "blue",
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                                    </svg>
                                ),
                            },
                            {
                                label: "Dilewati",
                                count: filteredQueues.filter(
                                    (q) => q.status === "skipped"
                                ).length,
                                color: "yellow",
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                                    </svg>
                                ),
                            },
                            {
                                label: "Selesai",
                                count: filteredQueues.filter(
                                    (q) => q.status === "done"
                                ).length,
                                color: "green",
                                icon: (
                                    <svg
                                        className="w-8 h-8"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ),
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${stat.color}-500`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">
                                            {stat.label}
                                        </p>
                                        <p
                                            className={`text-3xl font-bold text-${stat.color}-600 mt-1`}
                                        >
                                            {stat.count}
                                        </p>
                                    </div>
                                    <div className="text-gray-400">
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
