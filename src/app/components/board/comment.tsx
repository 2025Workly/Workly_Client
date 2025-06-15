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
    <div>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map((comment, idx) => (
          <div key={idx}>
            <span>{comment.userId}</span>
            <div>
              <div>{comment.comment}</div>
              <div>{new Date(comment.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
