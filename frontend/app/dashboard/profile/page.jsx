'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { setUser, getUser } from '@/lib/auth';
import { User as UserIcon, Mail, Save } from 'lucide-react';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = getUser();
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        setSuccessMessage('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await api.put('/me', formData);

            if (response.data.success) {
                setUser(response.data.data);
                setSuccessMessage('Profile updated successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            setServerError(
                error.response?.data?.message || 'Failed to update profile. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                <p className="mt-2 text-gray-600">Manage your account information</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {serverError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {serverError}
                        </div>
                    )}

                    {successMessage && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                            {successMessage}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            <UserIcon className="inline h-4 w-4 mr-1" />
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            <Mail className="inline h-4 w-4 mr-1" />
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                        <Save className="h-5 w-5 mr-2" />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}
