import { useState, useEffect, useRef } from "react";

const API_URL = "http://localhost:5000"; // ここをバックエンドのURLに変更

type Card = {
  id: number;
  text: string;
  likes: number;
};

const DreamCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 初回レンダリング時に「いいね！」データを取得
  useEffect(() => {
    fetch(`${API_URL}/get_likes`)
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("データ取得エラー:", err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreCards();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading]);

  // スクロール時に新しいカードを追加（仮のデータ）
  const loadMoreCards = () => {
    setLoading(true);
    setTimeout(() => {
      setCards((prev) => [
        ...prev,
        { id: prev.length + 1, text: "新しい夢！", likes: 0 },
        { id: prev.length + 2, text: "もっと成長したい！", likes: 0 },
      ]);
      setLoading(false);
    }, 1000);
  };

  // 「いいね！」を押した時にバックエンドにGETリクエストを送る
  const handleLike = async (id: number) => {
    // try {
      console.log('handle_like');
      // await fetch(`${API_URL}/like/${id}`, { method: "GET" });
      // // 最新の「いいね！」数を再取得
      // const res = await fetch(`${API_URL}/get_likes`);
      // const data = await res.json();
      const data = [
        { id: 0, text: "新しい夢！", likes: 1 },
        { id: 1, text: "もっと成長したい！", likes: 2 },
      ]
      setCards(data);
    // } catch (error) {
    //   console.error("いいね更新エラー:", error);
    // }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        みんなの夢を見よう！🌸
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-yellow-100 rounded-2xl p-6 shadow-lg border border-gray-300 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <p className="mb-4 text-gray-700">{card.text}</p>
            {/* 👍ボタン */}
            <button
              className="text-yellow-500 text-3xl hover:scale-110 transition-transform cursor-pointer"
              onClick={() => handleLike(card.id)}
            >
              👍
            </button>

            {/* いいね数表示 */}
            <span className="text-gray-600 text-sm mt-2">{card.likes} いいね</span>
          </div>
        ))}
      </div>
      {loading && <p className="mt-6 text-gray-500">読み込み中...</p>}
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
};

export default DreamCards;
