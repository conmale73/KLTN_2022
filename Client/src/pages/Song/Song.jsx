import styles from './Song.module.scss';

const Song = (props) => {
    return (
        <div className={styles.song}>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
        </div>
    )
}
export default Song;