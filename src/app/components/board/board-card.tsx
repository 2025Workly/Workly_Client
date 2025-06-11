import styles from "../../styles/board/board-card.module.css";

type BoardCardProps = {
  title: string;
  order: number; // 순서 (1, 2, 3 ...)
};

const rankStyles = [
  { bg: '#2A28B8', img: 'images/rank1.png' },
  { bg: '#4B49DD', img: 'images/rank2.png' },
  { bg: '#5173E1', img: 'images/rank3.png' },
];

const BoardCard: React.FC<BoardCardProps> = ({ title, order }) => {
  const style = rankStyles[order - 1] || { bg: '#fff', img: '' };

  return (
    <div style={{backgroundColor: style.bg}} className={styles.popular}>
        {style.img && (
          <img src={style.img} alt={`${order}위 이미지`} width={121} height={98} />
        )}
        <h3 style={{color: "white"}}>{title}</h3>
    </div>
  );
};

export default BoardCard;