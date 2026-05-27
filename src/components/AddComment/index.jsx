import React from "react";
import { useSelector } from "react-redux";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from "../../axios";

export const Index = ({ postId, fetchComments }) => {
  const userData = useSelector((state) => state.auth.data);

  const [text, setText] = React.useState("");

  const onSubmit = async () => {
    try {
      await axios.post("/comments", {
        text,
        postId,
      });

      setText("");

      fetchComments();
    } catch (err) {
      console.log(err.response?.data);
      console.log(err);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className={styles.root}>
      <Avatar
        classes={{ root: styles.avatar }}
        src={userData?.avatarUrl}
      />

      <div className={styles.form}>
        <TextField
          label="Add a comment"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button onClick={onSubmit} variant="contained">
          Send
        </Button>
      </div>
    </div>
  );
};