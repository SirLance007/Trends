import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addUser,
    fetchUsers,
    updateUser,
    deleteUser,
} from "../../redux/slices/adminSlice";

const UserManagment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { users, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (user && user.role !== "admin") {
        navigate("/");
        }
        // Only fetch users if admin
        if (user && user.role === "admin") {
        dispatch(fetchUsers());
        }
    }, [user, navigate, dispatch]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deleteUser(userId)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
            dispatch(fetchUsers()); // Refresh user list after successful delete
            }
        });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
            dispatch(fetchUsers()); // Refresh user list after successful add
            setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
            });
        }
        });
    };

    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUser({ id: userId, role: newRole })).then(() => {
        dispatch(fetchUsers());
        });
    };

    return (
        <div className=" rounded-lg max-w-3xl mx-auto p-6 min-h-screen flex flex-col gap-8 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        {loading && <p>Loading...</p>}
        {error && <p>Error : {error}</p>}
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-400 drop-shadow-lg tracking-tight animate-bounce-in flex items-center justify-center gap-3">
            <span className="animate-bounce">👥</span> User Management{" "}
            <span className="animate-bounce">✨</span>
        </h2>

        {/* User Form with colorful gradient neumorphic style */}
        <div className="relative z-10 p-8 mb-6 rounded-2xl bg-gradient-to-br from-blue-100 via-white to-indigo-200 shadow-neumorph border border-blue-200 overflow-hidden animate-fade-in-up">
            <svg
            className="absolute -top-10 -left-10 w-32 h-32 opacity-20 blur-2xl animate-float-slow z-0"
            viewBox="0 0 200 200"
            >
            <circle fill="#60a5fa" cx="100" cy="100" r="100" />
            </svg>
            <svg
            className="absolute bottom-0 right-0 w-24 h-24 opacity-10 blur-2xl animate-float-fast z-0"
            viewBox="0 0 200 200"
            >
            <ellipse fill="#a5b4fc" cx="100" cy="100" rx="100" ry="80" />
            </svg>
            <div className="relative z-10">
            <h3 className="text-lg mb-4 font-semibold text-blue-700 flex items-center gap-2 animate-pop">
                <span className="animate-bounce">➕</span> Add New User
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-blue-700 mb-1 font-medium">
                    Name
                    </label>
                    <input
                    className="w-full p-2 rounded-xl bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    />
                </div>
                <div>
                    <label className="block text-blue-700 mb-1 font-medium">
                    Email
                    </label>
                    <input
                    className="w-full p-2 rounded-xl bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    />
                </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-blue-700 mb-1 font-medium">
                    Password
                    </label>
                    <input
                    className="w-full p-2 rounded-xl bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    />
                </div>
                <div>
                    <label className="block text-blue-700 mb-1 font-medium">
                    Role
                    </label>
                    <select
                    className="w-full p-2 rounded-xl bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                    </select>
                </div>
                </div>
                <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-xl font-bold shadow-neumorph-btn hover:bg-blue-600 hover:shadow-neumorph-btn-hover transition-all flex items-center justify-center gap-2 border border-blue-300"
                >
                <span className="animate-bounce">➕</span> Add User
                </button>
            </form>
            </div>
        </div>

        {/* User Table with colorful gradient neumorphic style */}
        <div className="relative z-10 overflow-x-auto shadow-neumorph rounded-2xl bg-gradient-to-br from-blue-100 via-white to-indigo-200 border border-blue-100 animate-fade-in-up delay-200">
            <svg
            className="absolute -top-8 -left-8 w-24 h-24 opacity-10 blur-2xl animate-float-slow z-0"
            viewBox="0 0 200 200"
            >
            <circle fill="#60a5fa" cx="100" cy="100" r="100" />
            </svg>
            <svg
            className="absolute bottom-0 right-0 w-16 h-16 opacity-10 blur-2xl animate-float-fast z-0"
            viewBox="0 0 200 200"
            >
            <ellipse fill="#a5b4fc" cx="100" cy="100" rx="100" ry="80" />
            </svg>
            <div className="relative z-10">
            <table className="min-w-full text-left text-blue-900">
                <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 text-xs uppercase text-blue-700 animate-fade-in-up">
                <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {(users || []).filter(Boolean).map((user, idx) => (
                    <tr
                    key={user._id}
                    className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all animate-fade-in-up"
                    style={{ animationDelay: `${300 + idx * 60}ms` }}
                    >
                    <td className="p-4 font-medium text-blue-900 whitespace-nowrap flex items-center gap-2">
                        <span className="text-lg animate-bounce">👤</span>{" "}
                        {user.name}
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                        <select
                        className="p-2 rounded-xl bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                        value={user.role}
                        onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                        }
                        >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                        </select>
                    </td>
                    <td className="p-4 flex gap-2">
                        <button
                        onClick={() => {
                            handleDeleteUser(user._id);
                        }}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-neumorph-btn hover:bg-pink-500 hover:shadow-neumorph-btn-hover transition-all font-bold flex items-center gap-1 border border-pink-300 animate-pop"
                        >
                        <span className="animate-bounce">🗑️</span> Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default UserManagment;
