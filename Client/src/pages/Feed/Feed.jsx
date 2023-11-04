import styles from "./feed.module.scss";

const Feed = (props) => {
    document.title = props.title;
    return <div className={styles.feed}></div>;
};
export default Feed;
