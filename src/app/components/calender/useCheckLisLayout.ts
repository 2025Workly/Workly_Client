import dayjs from "dayjs";
import { useEffect, useState } from "react";

type CheckListItem = {
  checkId: number;
  content: string;
  checked: boolean;
};

type useCheckListLayoutParameterType = {
  selectedDate: dayjs.Dayjs;
  refreshDates: () => void;
};

export const useCheckListLayout = ({
  selectedDate,
  refreshDates,
}: useCheckListLayoutParameterType) => {
  const [inputs, setInputs] = useState<CheckListItem[]>([]);
  const [newInput, setNewInput] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [overtime, setOvertime] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const month = selectedDate.month() + 1;
  const day = selectedDate.date();

  const fetchCheckList = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/check?month=${month}&day=${day}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      const checkList = data.checkList.map((item: any) => ({
        checkId: item.id,
        content: item.content,
        checked: item.checked === 1,
      }));
      setInputs(checkList);
    } catch (error) {
      console.error("불러오기 실패:", error);
    }
  };

  const fetchOvertime = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/overtime?month=${month}&day=${day}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setOvertime(data.overtime === 1);
    } catch (error) {
      console.error("야근 정보 불러오기 실패:", error);
    }
  };

  const toggleOvertime = async () => {
    try {
      await fetch("http://localhost:5000/overtime", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ month, day, overtime: overtime ? 0 : 1 }),
      });
      setOvertime(!overtime);
    } catch (error) {
      console.error("야근 토글 실패:", error);
    }
  };

  const handleAddInputField = () => {
    if (!showInput) setShowInput(true);
  };

  const handleAdd = async () => {
    const content = newInput.trim();
    if (!content) return;
    try {
      await fetch("http://localhost:5000/check", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, month, day, checked: 0 }),
      });
      setNewInput("");
      setShowInput(false);
      await fetchCheckList();
      await refreshDates();
    } catch (error) {
      console.error("추가 실패:", error);
    }
  };

  const handleDelete = async (checkId: number) => {
    try {
      await fetch(`http://localhost:5000/check/${checkId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCheckList();
      await refreshDates();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleCheckToggle = async (checkId: number, checked: boolean) => {
    try {
      await fetch(`http://localhost:5000/check/${checkId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked: checked ? 0 : 1 }),
      });
      await fetchCheckList();
    } catch (error) {
      console.error("체크 상태 변경 실패:", error);
    }
  };

  useEffect(() => {
    fetchCheckList();
    fetchOvertime(); // 야근 정보도 가져오기
    setShowInput(false);
  }, [selectedDate]);

  return {
    newInput,
    inputs,
    showInput,
    handleCheckToggle,
    handleDelete,
    handleAddInputField,
    setNewInput,
    handleAdd,
    overtime,
    toggleOvertime,
  };
};
