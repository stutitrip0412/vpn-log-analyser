import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const LoginForm = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await login(formData);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-8">

            <h1 className="text-4xl font-bold text-cyan-400 text-center">

                VPN Forensic

            </h1>

            <p className="text-center text-gray-400 mt-3 mb-8">

                Investigator Login

            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <div>

                    <label className="text-gray-300">

                        Email

                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-500"
                    />

                </div>

                <div>

                    <label className="text-gray-300">

                        Password

                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-500"
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 transition rounded-lg py-3 font-semibold"
                >

                    {
                        loading
                            ? "Logging In..."
                            : "Login"
                    }

                </button>

            </form>

        </div>

    );

};

export default LoginForm;