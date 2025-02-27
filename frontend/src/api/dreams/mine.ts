import { Dream } from "../../types/dream";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const fetchMyDreams = async () => {
  const response = await fetch(`${ENDPOINT}/dreams`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("夢の取得に失敗しました");
  }

  const dreams = await response.json();
  return dreams;
};

export const createDream = async (dream: Dream) => {
  const response = await fetch(`${ENDPOINT}/dreams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dream),
  });

  if (!response.ok) {
    throw new Error("夢の保存に失敗しました");
  }

  return;
};
