import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import styles from "../components/Post/Post.module.scss";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const { id } = useParams();

  const fetchComments = async () => {
    const { data } = await axios.get(`/comments/${id}`);

    setComments(data);
  };

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        setLoading(false);
        alert("An error occurred while receiving post");
      });
  }, []);

  React.useEffect(() => {
    fetchComments();
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <div className={styles.postText}>
          <ReactMarkdown children={data.text} />
        </div>
      </Post>
      <CommentsBlock items={comments} isLoading={false} />

      <Index postId={id} fetchComments={fetchComments} />
    </>
  );
};
