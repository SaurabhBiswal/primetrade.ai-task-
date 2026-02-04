'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { CheckSquare, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        total: 0,
        todo: 0,
        inProgress: 0,
        completed: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/tasks');
            const tasks = response.data.data;

            setStats({
                total: tasks.length,
                todo: tasks.filter((t) => t.status === 'todo').length,
                inProgress: tasks.filter((t) => t.status === 'in-progress').length,
                completed: tasks.filter((t) => t.status === 'completed').length,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Tasks', value: stats.total, icon: CheckSquare, color: 'purple' },
        { label: 'To Do', value: stats.todo, icon: AlertCircle, color: 'blue' },
        { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'yellow' },
        { label: 'Completed', value: stats.completed, icon: CheckSquare, color: 'green' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">Overview of your tasks and activities</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                                            <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href="/dashboard/tasks/new"
                                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                            >
                                <CheckSquare className="h-5 w-5 mr-2" />
                                Create New Task
                            </Link>
                            <Link
                                href="/dashboard/tasks"
                                className="flex items-center justify-center px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all"
                            >
                                View All Tasks
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
