import { Dream } from "@/types/dream";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const fetchPublicDreams = async (): Promise<Dream[]> => {
  try {
    const response = await fetch(`${ENDPOINT}/public/dream`, { method: "GET" });
    if (!response.ok) {
      throw new Error("データ取得エラー");
    }

    const publicDreams = await response.json();
    return publicDreams;
  } catch (error) {
    console.error("APIエラー:", error);
    return [];
  }
};

// **「いいね！」を更新 **
export const increasePublicDreamLikes = async (
  dreamId: number
): Promise<Dream[]> => {
  try {
    await fetch(`${ENDPOINT}/public/like/${dreamId}`, { method: "POST" }); // いいね更新をPOSTメソッドに変更
    const publicDreams = await fetchPublicDreams();
    return publicDreams;
  } catch (error) {
    console.error("いいね更新エラー:", error);
    return [];
  }
};
