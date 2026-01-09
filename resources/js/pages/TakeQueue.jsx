import { useState, useEffect } from "react";
import axios from "axios";

export default function TakeQueue() {
    const [polyclinics, setPolyclinics] = useState([]);
    const [selectedPolyclinic, setSelectedPolyclinic] = useState("");
    const [patientName, setPatientName] = useState("");
    const [loading, setLoading] = useState(false);
    const [queueResult, setQueueResult] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPolyclinics();
    }, []);

    const fetchPolyclinics = async () => {
        try {
            const response = await axios.get("/api/polyclinics/active");
            setPolyclinics(response.data.data || []);
        } catch (error) {
            console.error("Error fetching polyclinics:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("/api/queues", {
                patient_name: patientName,
                polyclinic_id: selectedPolyclinic,
            });

            if (response.data.success) {
                setQueueResult(response.data.data);
                // Reset form
                setPatientName("");
                setSelectedPolyclinic("");
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "Gagal mengambil nomor antrian"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleNewQueue = () => {
        setQueueResult(null);
        setError("");
    };

    const handlePrint = () => {
        window.print();
    };

    // Jika sudah mendapatkan nomor antrian, tampilkan struk
    if (queueResult) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Nomor Antrian Anda
                        </h2>
                        <p className="text-gray-600">
                            Silakan tunggu giliran Anda dipanggil
                        </p>
                    </div>

                    <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl p-8 mb-6 text-center">
                        <p className="text-white text-sm font-semibold mb-2 uppercase tracking-wide">
                            {queueResult.polyclinic?.name || "Poliklinik"}
                        </p>
                        <div className="text-8xl font-bold text-white mb-2">
                            {queueResult.queue_number}
                        </div>
                        <p className="text-blue-100 text-sm">
                            {new Date(
                                queueResult.queue_date
                            ).toLocaleDateString("id-ID", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600 text-sm">
                                Nama Pasien:
                            </span>
                            <span className="font-semibold text-gray-800">
                                {queueResult.patient_name}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">
                                Status:
                            </span>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                                Menunggu
                            </span>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p className="text-sm text-blue-800">
                            <strong>Catatan:</strong> Harap pantau layar antrian
                            dan tunggu nomor Anda dipanggil. Pastikan Anda
                            berada di area tunggu.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                ></path>
                            </svg>
                            Cetak
                        </button>
                        <button
                            onClick={handleNewQueue}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                        >
                            Ambil Antrian Baru
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Form untuk mengambil nomor antrian
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            ></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Ambil Nomor Antrian
                    </h1>
                    <p className="text-gray-600">
                        Isi data di bawah untuk mendapatkan nomor antrian
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Masukkan nama lengkap Anda"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pilih Poliklinik{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedPolyclinic}
                            onChange={(e) =>
                                setSelectedPolyclinic(e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                            disabled={loading}
                        >
                            <option value="">-- Pilih Poliklinik --</option>
                            {polyclinics.map((poly) => (
                                <option key={poly.id} value={poly.id}>
                                    {poly.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={
                            loading || !patientName || !selectedPolyclinic
                        }
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Memproses...
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    ></path>
                                </svg>
                                Ambil Nomor Antrian
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        Pastikan data yang Anda masukkan sudah benar sebelum
                        mengambil nomor antrian
                    </p>
                </div>
            </div>

            <style jsx>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-area,
                    .print-area * {
                        visibility: visible;
                    }
                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
            `}</style>
        </div>
    );
}
