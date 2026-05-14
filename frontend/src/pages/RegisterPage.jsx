import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { FiUser, FiLock, FiMail} from 'react-icons/fi';
//import api yg dah jd

//buat fungsi utama
function RegisterPage() {
    //siapin setiap perubahan value disetiap form
    const [username, onChangeUsername] = useInput('');
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [confirmPassword, onChangeConfirmPassword] = useInput('');

    //fungsi untuk button submit
    async function onSubmitHandler(event){
        //prevent refresh page
        event.preventDefault();

        if (password !== confirmPassword) {
            return alert("Password doesnt matchh");
        }
        try {
            const response = await fetch(`http://localhost:5001/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Regsiter Success");
                navigate('/login');
            } else {
                alert(data.message || "Register Failed");
            }
        } catch (error) {
            console.error("Error fetching:", error);
            alert("Failed to connect to hte backend serverr");
        }
    }

    //return UI
    return (
        <main className="min-h-screen bg-[#7A93AA] flex flex-col items-center justify-center p-8">
             <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl flex overflow-hidden min-h-[500px]">
                <div className="flex-1 p-16 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-semibold mb-10">Register</h1>
                    <form onSubmit={onSubmitHandler} className="w-full max-w-sm flex flex-col gap-4">
                        <div className="relative">
                            <FiUser className="absolute left-4 top-4 text-gray-400" />
                            <input type="text" id="username" placeholder="Username" value={username} onChange={onChangeUsername} required 
                                className="w-full border p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                        </div>

                        <div className="relative">
                            <FiMail className="absolute left-4 top-4 text-gray-400" />
                            <input type="email" id="email" placeholder="Email" value={email} onChange={onChangeEmail} required 
                                className="w-full border p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute left-4 top-4 text-gray-400" />
                            <input type="password" id="password" placeholder="Password" value={password} onChange={onChangePassword} required 
                                className="w-full border p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute left-4 top-4 text-gray-400" />
                            <input type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={onChangeConfirmPassword} required 
                                className="w-full border p-3 pl-12 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                        </div>
                    
                        <button type="submit"
                            className="bg-[#7B85CE] text-white py-3 rounded-xl font-bold mt-4 hover:bg-indigo-600 transition shadow-lg">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

//export fungsi
export default RegisterPage;