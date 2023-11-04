import styles from "./socialHome.module.scss";
import PostTool from "../../components/PostTool";
import { useSelector } from "react-redux";
import PostList from "../../components/PostList";
const SocialHome = () => {
    const user = useSelector((state) => state.user.data);
    return (
        <div className={styles.socialHome}>
            <PostTool />
            <PostList userId={user._id} />
        </div>
    );
};
export default SocialHome;
