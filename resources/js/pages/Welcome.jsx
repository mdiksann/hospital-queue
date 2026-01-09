import { Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                        Sistem Antrian Rumah Sakit
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100">
                        Kelola antrian poliklinik dengan mudah dan efisien
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card untuk Pasien */}
                    <Link href="/take-queue" className="group">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                                Ambil Antrian
                            </h3>
                            <p className="text-gray-600 text-center mb-4">
                                Dapatkan nomor antrian untuk layanan poliklinik
                            </p>
                            <div className="flex justify-center">
                                <span className="inline-flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    Mulai
                                    <svg
                                        className="w-5 h-5 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Card untuk Layar Antrian */}
                    <Link href="/queue-screen" className="group">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
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
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                                Layar Antrian
                            </h3>
                            <p className="text-gray-600 text-center mb-4">
                                Tampilan layar monitor untuk nomor antrian
                            </p>
                            <div className="flex justify-center">
                                <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    Lihat
                                    <svg
                                        className="w-5 h-5 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Card untuk Admin */}
                    <Link href="/admin/dashboard" className="group">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                            <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
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
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                                Admin Dashboard
                            </h3>
                            <p className="text-gray-600 text-center mb-4">
                                Kelola antrian dan panggil pasien
                            </p>
                            <div className="flex justify-center">
                                <span className="inline-flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    Masuk
                                    <svg
                                        className="w-5 h-5 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Info Section */}
                <div className="mt-12 grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                        <h4 className="font-semibold mb-1">Mudah Digunakan</h4>
                        <p className="text-sm text-blue-100">
                            Interface yang simpel dan intuitif
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                        <h4 className="font-semibold mb-1">Real-time</h4>
                        <p className="text-sm text-blue-100">
                            Update antrian secara langsung
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                        <h4 className="font-semibold mb-1">Aman</h4>
                        <p className="text-sm text-blue-100">
                            Data pasien terlindungi dengan baik
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
