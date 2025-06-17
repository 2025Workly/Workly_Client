"use client";
import Image from "next/image";

type infoProps = {
  title: String;
  setNumPlus: () => void;
  setNumMinus: () => void;
  numValue: number;
};
export default function PlusMinusBtn({
  title,
  setNumPlus,
  setNumMinus,
  numValue,
}: infoProps) {
  return (
    <div>
      <p
        style={{
          color: "#1C1C1C",
          fontSize: "25px",
          fontWeight: 500,
          marginBottom: "43px",
        }}
      >
        {title}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "44px",
          marginLeft: "3px",
          cursor: "pointer",
        }}
      >
        <Image
          alt="플러스버튼"
          src={"/images/plusButton.png"}
          width={30}
          height={30}
          onClick={setNumPlus}
        />
        <p
          style={{
            color: "#424242",
            fontSize: "25px",
          }}
        >
          {numValue}
        </p>
        <Image
          alt="마이너스 버튼"
          src={"/images/minusButton.png"}
          width={30}
          height={30}
          onClick={setNumMinus}
        />
      </div>
    </div>
  );
}
