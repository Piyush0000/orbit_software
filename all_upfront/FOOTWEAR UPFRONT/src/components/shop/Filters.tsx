'use client';

import { useState } from 'react';
import styles from './Filters.module.css';

export function Filters() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const togglePrice = (price: string) => {
        if (selectedPrice.includes(price)) {
            setSelectedPrice(selectedPrice.filter(p => p !== price));
        } else {
            setSelectedPrice([...selectedPrice, price]);
        }
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Category</h3>
                <div className={styles.options}>
                    {['Sneakers', 'Running', 'Casual', 'Formal', 'Sandals'].map(category => (
                        <label key={category} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Price</h3>
                <div className={styles.options}>
                    {['Under ₹2500', '₹2500 - ₹5000', '₹5000 - ₹10000', 'Over ₹10000'].map(price => (
                        <label key={price} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedPrice.includes(price)}
                                onChange={() => togglePrice(price)}
                            />
                            {price}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Color</h3>
                <div className={styles.colorGrid}>
                    {[
                        { name: 'Black', hex: '#000' },
                        { name: 'White', hex: '#fff' },
                        { name: 'Grey', hex: '#888' },
                        { name: 'Navy', hex: '#000080' },
                        { name: 'Red', hex: '#ff0000' }
                    ].map(color => (
                        <button
                            key={color.name}
                            className={`${styles.colorOption} ${selectedColor === color.name ? styles.selectedColor : ''}`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => setSelectedColor(color.name === selectedColor ? null : color.name)}
                            aria-label={color.name}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Size (US)</h3>
                <div className={styles.sizeGrid}>
                    {['7', '7.5', '8', '8.5', '9', '9.5', '10', '11'].map(size => (
                        <button
                            key={size}
                            className={`${styles.sizeOption} ${selectedSize === size ? styles.selectedSize : ''}`}
                            onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
