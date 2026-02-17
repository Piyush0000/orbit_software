import { Button } from '../ui/Button';
import styles from './Offers.module.css';

export function Offers() {
    return (
        <section className={styles.offers}>
            <div className={styles.content}>
                <h2>Flat 30% Off on Running Shoes</h2>
                <p>Enhance your performance with our premium running collection.</p>
                <Button variant="primary" size="lg">Grab Deal</Button>
            </div>
        </section>
    );
}
