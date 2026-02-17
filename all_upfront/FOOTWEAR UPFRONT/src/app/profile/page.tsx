'use client';

import { User, Package, MapPin, CreditCard, Settings } from 'lucide-react';
import styles from './profile.module.css';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('personal'); // Default to personal details
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    // Mock Orders Data
    const orders = [
        {
            id: 'ORD-2023-001',
            date: '2023-11-15',
            status: 'Delivered',
            total: 2499,
            items: [
                { name: 'Urban Glide', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=2898&auto=format&fit=crop' }
            ]
        },
        {
            id: 'ORD-2023-002',
            date: '2023-10-01',
            status: 'Delivered',
            total: 4999,
            items: [
                { name: 'Velocity Runner', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop' }
            ]
        },
        {
            id: 'ORD-2024-001',
            date: '2024-01-20',
            status: 'Processing',
            total: 3499,
            items: [
                { name: 'Court Master', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2940&auto=format&fit=crop' }
            ]
        }
    ];

    useEffect(() => {
        if (user) {
            const nameParts = user.name.split(' ');
            setFormData({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                email: user.email,
                phone: user.phone || '',
                dob: user.dob || '',
                gender: user.gender || 'Male',
                street: user.address?.street || '',
                city: user.address?.city || '',
                state: user.address?.state || '',
                zipCode: user.address?.zipCode || '',
                country: user.address?.country || ''
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateUser({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            dob: formData.dob,
            gender: formData.gender,
            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country
            }
        });
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    if (!user) {
        return <div className={styles.container}>Please log in to view your profile.</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>{user.name.charAt(0)}</div>
                    <div className={styles.userDetails}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'personal' ? styles.active : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        <Settings size={20} /> Personal Details
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <Package size={20} /> Orders
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'addresses' ? styles.active : ''}`}
                        onClick={() => setActiveTab('addresses')}
                    >
                        <MapPin size={20} /> Addresses
                    </button>
                </nav>
            </div>

            <main className={styles.content}>


                {activeTab === 'personal' && (
                    <>
                        {/* ... Existing Personal Details Form ... */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h1 className={styles.pageTitle} style={{ margin: 0 }}>Personal Details</h1>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: isEditing ? '#fee2e2' : 'var(--color-secondary)',
                                    color: isEditing ? '#ef4444' : 'var(--color-primary)',
                                    border: '1px solid currentColor',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {isEditing ? 'Cancel Edit' : 'Edit Details'}
                            </button>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={true}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        {isEditing && (
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className={styles.saveBtn} onClick={handleSave}>Save Changes</button>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'addresses' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h1 className={styles.pageTitle} style={{ margin: 0 }}>Address Details</h1>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: isEditing ? '#fee2e2' : 'var(--color-secondary)',
                                    color: isEditing ? '#ef4444' : 'var(--color-primary)',
                                    border: '1px solid currentColor',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {isEditing ? 'Cancel Edit' : 'Edit Details'}
                            </button>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Shipping Address</h3>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Street Address</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className={styles.saveBtn} onClick={handleSave}>Save Changes</button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <>
                        <h1 className={styles.pageTitle}>Order History</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {orders.map(order => (
                                <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1.5rem', background: 'white' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #f5f5f5', paddingBottom: '0.5rem' }}>
                                        <div>
                                            <span style={{ fontWeight: 'bold' }}>{order.id}</span>
                                            <span style={{ margin: '0 0.5rem', color: '#ccc' }}>|</span>
                                            <span style={{ color: '#666' }}>{order.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                background: order.status === 'Delivered' ? '#dcfce7' : '#fff7ed',
                                                color: order.status === 'Delivered' ? '#166534' : '#c2410c',
                                                fontWeight: 'bold'
                                            }}>
                                                {order.status}
                                            </span>
                                            <span style={{ fontWeight: 'bold' }}>₹{order.total.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '60px', height: '60px', background: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                                            <img src={order.items[0].image} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '600' }}>{order.items[0].name}</p>
                                            {order.items.length > 1 && <p style={{ fontSize: '0.8rem', color: '#666' }}>+ {order.items.length - 1} more items</p>}
                                        </div>
                                        <button style={{ marginLeft: 'auto', background: 'none', border: '1px solid #ddd', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                                            View Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
