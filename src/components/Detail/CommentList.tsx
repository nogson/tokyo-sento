import React from "react";
import styles from "./CommentList.module.scss";
import { Comment } from "@prisma/client";
import Image from "next/image";

interface CommentProps {
  comment: Comment[];
}

const CommentList: React.FC<CommentProps> = ({ comment }) => {
  const getClassName = () => {
    const index = Math.floor(Math.random() * 3) + 1;
    return styles[`commentFace${index}`];
  };

  return (
    <div className={styles.detailCustomerVoice}>
      <h2>利用者の声</h2>
      {comment && comment.length > 0 ? (
        comment.map((c) => (
          <dl className={styles.detailCustomerVoiceItem} key={c.id}>
            <dt className={getClassName()}></dt>
            <dd>{c.content}</dd>
          </dl>
        ))
      ) : (
        <p className="mt-md">まだコメントがありません</p>
      )}
    </div>
  );
};

export default CommentList;
