import { Dream } from "../../types/dream";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const fetchMyDreams = async () => {
  const token = sessionStorage.getItem("token")
  const response = await fetch(`${ENDPOINT}/dreams`, {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      "Authorization": `${token}`,  // JWTトークンをセット
    },
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("夢の取得に失敗しました");
  }

  const dreams = await response.json();
  return dreams;
};

export const createDream = async (dream: Dream) => {
  const token = sessionStorage.getItem("token")
  const response = await fetch(`${ENDPOINT}/dreams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,  // JWTトークンをセット
    },
    body: JSON.stringify(dream),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("夢の保存に失敗しました");
  }

  return;
};

export const deleteDream = async (dreamId: number) => {
  const token = sessionStorage.getItem("token")
  const response = await fetch(`${ENDPOINT}/dreams/${dreamId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,  // JWTトークンをセット
    },
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("夢の削除に失敗しました");
  }

  return;
};
