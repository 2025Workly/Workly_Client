import styles from "../../styles/board/getComment.module.css";
type CommentItemProps = {
  boardId: string;
  userId: string;
  comment: string;
  createdAt: Date;
};

type CommentProps = {
  boardId: string;
  comments: CommentItemProps[];
};

export default function Comment({ comments }: CommentProps) {
  return (
    <div className={styles.commentAllContainer}>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map((comment, idx) => (
          <div key={idx} className={styles.commentContainer}>
            <span className={styles.userName}>{comment.userId}</span>
            <div className={styles.bottomContainer}>
              <div className={styles.getComment}>{comment.comment}</div>
              <div className={styles.createDate}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
