'use client';

type Props = {
  tag: string;
  title: string;
  content: string;
};

export default function BoardDetail({ tag, title, content }: Props) {
  return (
    <div style={{ padding: "20px", background: "#fff", marginTop: "16px" }}>
      <h2>{title}</h2>
      <p><strong>[{tag}]</strong></p>
      <div>{content}</div>
    </div>
  );
}
