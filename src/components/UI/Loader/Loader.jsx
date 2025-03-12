import styles from './Loader.module.css'; // Импортируем стили как объект

const Loader = () => {
    return (
        <div className={styles.loader}> {/* Используем styles.loader для доступа к классу */}
            
        </div>
    );
}

export default Loader;