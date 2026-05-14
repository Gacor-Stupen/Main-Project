import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <main className="min-h-screen bg-[#7A93AA] flex flex-col items-center justify-center p-8 text-white">
            <div className="text-center max-w-2xl">
                <h1 className="text-5xl font-bold mb-6">Welcome to ResignAjaDulu</h1>
                <p className="text-xl mb-10 leading-relaxed">
                    Platform terbaik untuk merencanakan masa depan kariermu dengan matang. 
                    Kelola rencanamu sekarang, resign kemudian!
                </p>
                <div className="flex gap-4 justify-center">
                    <Link to="/login" 
                        className="bg-white text-[#7B85CE] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
                        Login
                    </Link>
                    <Link to="/register" 
                        className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-[#7B85CE] transition shadow-lg">
                        Register
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default LandingPage;