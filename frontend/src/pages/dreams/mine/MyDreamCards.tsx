import { AlertDialog, Button } from "@radix-ui/themes";
import { fetchDreams,Card } from "../../../api/dream";
import { useState, useEffect } from "react";

const MyDreamCards = () => {
  const [dreams, setDreams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDreams = async () => {
      try {
        const data: Card[] = await fetchDreams(); // Card[] を受け取る
        setDreams(data.map((card) => card.content)); // title のみを抽出して string[] に変換
      } catch (err) {
        setError(err instanceof Error ? err.message : "夢の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    
    loadDreams();
  }, []);

  if (loading) return <p className="text-center mt-4">ロード中...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
      {dreams.map((dream, index) => (
        <AlertDialog.Root key={index}>
          <AlertDialog.Trigger>
            <div className="border bg-white rounded-xl shadow-lg p-4 min-h-48 py-6 hover:shadow-2xl transition">
              <p className="text-gray-800 overflow-hidden text-ellipsis">{dream}</p>
            </div>
          </AlertDialog.Trigger>
          <AlertDialog.Content className="flex flex-col justify-between min-h-[250px] max-w-[400px] p-6">
            <AlertDialog.Description className="text-lg text-gray-700">
              {dream}
            </AlertDialog.Description>
            <div className="flex justify-center gap-3 mt-4">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  閉じる
                </Button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      ))}
    </div>
  );
};

export default MyDreamCards;
