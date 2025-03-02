import { Dream } from "@/types/dream";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const fetchMyDreams = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/dreams`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("夢の取得に失敗しました");
  }

  const dreams = await response.json();
  return dreams;
};

export const createDream = async (dream: Dream) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/dreams`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dream),
  });

  if (!response.ok) {
    throw new Error("夢の保存に失敗しました");
  }

  return;
};

export const deleteDream = async (dreamId: number) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/dreams/${dreamId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("夢の削除に失敗しました");
  }

  return;
};
