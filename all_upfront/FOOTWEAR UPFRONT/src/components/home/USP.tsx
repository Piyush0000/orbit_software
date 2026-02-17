import styles from './USP.module.css';

export function USP() {
    return (
        <section className={styles.usp}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <span className={styles.icon}>🚚</span>
                    <span>Free Delivery</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.icon}>↩️</span>
                    <span>Easy Returns</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.icon}>🛡️</span>
                    <span>Genuine Materials</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.icon}>👟</span>
                    <span>Comfort Guarantee</span>
                </div>
            </div>
        </section>
    );
}
