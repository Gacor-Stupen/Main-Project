import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Cek apakah ada data user di localStorage
        const user = localStorage.getItem("user");
        
        // Kalau tidak ada, tendang balik ke halaman login
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <main className="min-h-screen bg-[#7A93AA] flex flex-col items-center justify-center p-8">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
                <h1 className="text-4xl font-bold mb-4 text-[#7B85CE]">Dashboard ResignAjaDulu</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Selamat datang! Ini adalah area rahasia yang hanya bisa dilihat setelah login.
                </p>
                
                {/* Tombol Logout sederhana */}
                <button 
                    onClick={() => {
                        localStorage.removeItem("user"); // Hapus data login
                        navigate('/'); // Balik ke landing page
                    }}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
                    Logout
                </button>
            </div>
        </main>
    );
}

export default HomePage;