import React, { useEffect, useState } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";

export default function QueueScreen() {
    const [polyclinics, setPolyclinics] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    const fetchDisplayData = async () => {
        try {
            const response = await axios.get("/api/display/queues");
            setPolyclinics(response.data.data);
        } catch (error) {
            console.error("Error fetching display data:", error);
        }
    };

    useEffect(() => {
        fetchDisplayData();

        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        window.Echo.channel("hospital-queue").listen(".queue.updated", (e) => {
            console.log("Realtime update received:", e);

            // Update state langsung dari event
            setPolyclinics((prev) => {
                return prev.map((poly) => {
                    if (poly.id === e.queue.polyclinic_id) {
                        return {
                            ...poly,
                            queues:
                                e.queue.status === "called" ? [e.queue] : [],
                        };
                    }
                    return poly;
                });
            });
        });

        return () => {
            clearInterval(timeInterval);
            window.Echo.leave("hospital-queue");
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const styles = {
        container: {
            minHeight: "100vh",
            background:
                "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3730a3 100%)",
            color: "white",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "20px 40px",
        },
        date: {
            fontSize: "1.3rem",
            opacity: 0.9,
        },
        clock: {
            fontSize: "2.5rem",
            fontWeight: "bold",
            letterSpacing: "2px",
        },
        content: {
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "20px 40px 40px 40px",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
        },
        card: {
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
        },
        cardHeader: {
            background: "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
            padding: "20px",
            textAlign: "center",
        },
        cardTitle: {
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "white",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
        },
        cardBody: {
            padding: "40px 30px",
            textAlign: "center",
        },
        label: {
            fontSize: "0.9rem",
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "15px",
            fontWeight: "600",
        },
        queueBox: {
            background: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
            color: "white",
            borderRadius: "15px",
            padding: "40px 20px",
            marginBottom: "20px",
            boxShadow: "0 10px 30px rgba(59,130,246,0.4)",
        },
        queueNumber: {
            fontSize: "6rem",
            fontWeight: "900",
            margin: 0,
            letterSpacing: "3px",
        },
        patientBox: {
            background: "#f3f4f6",
            borderRadius: "12px",
            padding: "15px 20px",
        },
        patientLabel: {
            fontSize: "0.85rem",
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "5px",
        },
        patientName: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#1f2937",
            margin: 0,
        },
        badge: {
            display: "inline-block",
            padding: "10px 25px",
            borderRadius: "25px",
            fontSize: "0.95rem",
            fontWeight: "600",
            marginTop: "15px",
        },
        badgeCalled: {
            background: "#10b981",
            color: "white",
        },
        badgeWaiting: {
            background: "#f59e0b",
            color: "white",
        },
        emptyState: {
            textAlign: "center",
            padding: "60px 20px",
        },
        emptyIcon: {
            fontSize: "4rem",
            marginBottom: "20px",
            opacity: 0.3,
        },
        emptyText: {
            color: "#9ca3af",
            fontSize: "1.3rem",
            fontWeight: "500",
            fontStyle: "italic",
        },
        loading: {
            textAlign: "center",
            padding: "80px 20px",
        },
        spinner: {
            width: "60px",
            height: "60px",
            border: "4px solid rgba(255,255,255,0.3)",
            borderTop: "4px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px auto",
        },
        loadingText: {
            fontSize: "1.5rem",
            fontWeight: "500",
        },
    };

    return (
        <>
            <Head title="Queue Monitor Screen" />

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .card-hover:hover {
                    transform: scale(1.03);
                    box-shadow: 0 25px 70px rgba(59,130,246,0.4);
                }
            `}</style>

            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.date}>{formatDate(currentTime)}</div>
                    <div style={styles.clock}>{formatTime(currentTime)}</div>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {polyclinics.length > 0 ? (
                        <div style={styles.grid}>
                            {polyclinics.map((poly) => (
                                <div
                                    key={poly.id}
                                    className="card-hover"
                                    style={styles.card}
                                >
                                    {/* Header Poli */}
                                    <div style={styles.cardHeader}>
                                        <h2 style={styles.cardTitle}>
                                            {poly.name}
                                        </h2>
                                    </div>

                                    {/* Content Antrian */}
                                    <div style={styles.cardBody}>
                                        {poly.queues &&
                                        poly.queues.length > 0 ? (
                                            <div>
                                                <p style={styles.label}>
                                                    Nomor Dipanggil
                                                </p>
                                                <div style={styles.queueBox}>
                                                    <div
                                                        style={
                                                            styles.queueNumber
                                                        }
                                                    >
                                                        {
                                                            poly.queues[0]
                                                                .queue_number
                                                        }
                                                    </div>
                                                </div>
                                                <div style={styles.patientBox}>
                                                    <p
                                                        style={
                                                            styles.patientLabel
                                                        }
                                                    >
                                                        Nama Pasien
                                                    </p>
                                                    <p
                                                        style={
                                                            styles.patientName
                                                        }
                                                    >
                                                        {
                                                            poly.queues[0]
                                                                .patient_name
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <span
                                                        style={{
                                                            ...styles.badge,
                                                            ...(poly.queues[0]
                                                                .status ===
                                                            "called"
                                                                ? styles.badgeCalled
                                                                : styles.badgeWaiting),
                                                        }}
                                                    >
                                                        {poly.queues[0]
                                                            .status === "called"
                                                            ? "Sedang Dipanggil"
                                                            : "Menunggu"}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={styles.emptyState}>
                                                <div style={styles.emptyIcon}>
                                                    💤
                                                </div>
                                                <p style={styles.emptyText}>
                                                    Tidak ada antrian aktif
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.loading}>
                            <div style={styles.spinner}></div>
                            <p style={styles.loadingText}>
                                Memuat data poliklinik...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
