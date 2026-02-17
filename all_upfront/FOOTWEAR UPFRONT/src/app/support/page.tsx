'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, MessageCircle } from 'lucide-react';

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        {
            question: "How do I return an item?",
            answer: "You can return any unworn item within 15 days of delivery. Go to your Profile > Orders, select the order, and click 'Return Item'. We will arrange a pickup."
        },
        {
            question: "When will I receive my refund?",
            answer: "Once we receive the returned item, it goes through a quality check (1-2 days). The refund is then processed and credited to your original payment method within 5-7 business days."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we only ship within India. We are working on expanding our shipping to international locations soon."
        },
        {
            question: "How can I track my order?",
            answer: "You can track your order in real-time from the 'Orders' section in your Profile. You will also receive SMS and Email updates."
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Your message has been sent! We will get back to you shortly.');
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontSize: '3rem', marginBottom: '1rem' }}>
                    How can we help?
                </h1>
                <p style={{ color: '#666', fontSize: '1.2rem' }}>
                    Find answers to common questions or get in touch with our team.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                {/* FAQs */}
                <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '2rem' }}>
                        Frequently Asked Questions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, index) => (
                            <div key={index} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1.5rem',
                                        background: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontWeight: 'bold',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {faq.question}
                                    {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {openFaq === index && (
                                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#666', lineHeight: '1.6' }}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '12px' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '2rem' }}>
                        Contact Us
                    </h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Name</label>
                            <input
                                type="text"
                                required
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Email</label>
                            <input
                                type="email"
                                required
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Message</label>
                            <textarea
                                rows={5}
                                required
                                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                marginTop: '1rem',
                                background: 'black',
                                color: 'white',
                                border: 'none',
                                padding: '1rem',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}
                        >
                            Send Message
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Mail size={20} />
                            <span>support@upfront.com</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Phone size={20} />
                            <span>+91 1800-123-4567</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <MessageCircle size={20} />
                            <span>Live Chat (9 AM - 6 PM)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
