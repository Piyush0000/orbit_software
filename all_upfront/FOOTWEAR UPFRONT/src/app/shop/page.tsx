import { Filters } from '@/components/shop/Filters';
import { ProductCard } from '@/components/shop/ProductCard';
import styles from './page.module.css';
import { products } from '@/data/products';

export default function ShopPage() {
    return (
        <div className={styles.container}>
            <Filters />

            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>All Shoes ({products.length})</h1>
                    <select className={styles.sort}>
                        <option>Sort by: Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>

                <div className={styles.grid}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </div>
    );
}
