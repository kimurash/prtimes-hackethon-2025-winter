const API_URL = "http://localhost:5000/dreams"; // バックエンドのURL

// 夢データの型
export type Card = {
  id: number;
  content: string;
  likes: number;
};

export const fetchDreams = async (): Promise<Card[]> => {
    try {
      const res = await fetch(API_URL, { method: "GET" });
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
    await fetch(`${API_URL}/${id}`, { method: "GET" }); // いいね更新
    return await fetchDreams(); // 最新のデータを取得
  } catch (error) {
    console.error("いいね更新エラー:", error);
    return [];
  }
};
