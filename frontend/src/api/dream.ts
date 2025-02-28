const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

// 夢データの型
export type Card = {
  id: number;
  content: string;
  likes: number;
};

export const fetchDreams = async (): Promise<Card[]> => {
    try {
      const res = await fetch(`${ENDPOINT}/dreams`, { method: "GET" ,credentials: "include"});
      if (!res.ok) throw new Error("データ取得エラー");
      return await res.json();
    } catch (error) {
      console.error("APIエラー:", error);
      return [];
    }
  };
  

// **「いいね！」を更新（GET /dreams/{id}）**
export const likeDream = async (id: number): Promise<Card[]> => {
  try {
    await fetch(`${ENDPOINT}/${id}`, { method: "GET" }); // いいね更新
    return await fetchDreams(); // 最新のデータを取得
  } catch (error) {
    console.error("いいね更新エラー:", error);
    return [];
  }
};
