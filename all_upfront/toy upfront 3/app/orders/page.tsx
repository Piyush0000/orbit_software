'use client';

import { useAuth } from '@/store/authStore';
import { Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Mock Data for Orders
const MOCK_ORDERS = [
    {
        id: 'ORD-2024-001',
        date: 'Oct 15, 2024',
        total: '₹2,499',
        status: 'Delivered',
        items: [
            { name: 'LEGO Classic Brick Box', image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=2071&auto=format&fit=crop' },
            { name: 'Plush Teddy Bear', image: 'https://images.unsplash.com/photo-1559454403-b8fb87521bc7?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    {
        id: 'ORD-2024-002',
        date: 'Nov 02, 2024',
        total: '₹1,299',
        status: 'Processing',
        items: [
            { name: 'Remote Control Car', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=2070&auto=format&fit=crop' }
        ]
    }
];

export default function OrdersPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-secondary/10 rounded-2xl text-secondary hidden sm:block">
                        <Package className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 font-display">My Orders</h1>
                        <p className="text-gray-500">Track and manage your recent purchases</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {MOCK_ORDERS.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Order Header */}
                            <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Order ID</p>
                                    <p className="font-bold text-gray-900">{order.id}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Date Placed</p>
                                    <p className="font-medium text-gray-600">{order.date}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Total Amount</p>
                                    <p className="font-bold text-secondary text-lg">{order.total}</p>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {order.status === 'Delivered' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6 bg-gray-50/30">
                                <div className="flex items-center gap-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="relative group">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-white">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                                {item.name}
                                            </div>
                                        </div>
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm border border-gray-200">
                                            +{order.items.length - 3}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Truck className="w-4 h-4" />
                                    <span>Standard Delivery</span>
                                </div>
                                <button className="text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                                    View Details <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State Suggestion */}
                <div className="mt-12 text-center p-8 bg-white rounded-3xl border border-gray-100 border-dashed">
                    <p className="text-gray-400 mb-4">Looking for more toys?</p>
                    <Link href="/" className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        Start Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
