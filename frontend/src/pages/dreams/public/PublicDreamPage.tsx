import { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import { fetchDreams, likeDream, Card } from "../../../api/dream";


const DreamCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // **初回データ取得**
  useEffect(() => {
    const loadDreams = async () => {
      setLoading(true);
      const data = await fetchDreams();
      setCards(data);
      setLoading(false);
    };
    loadDreams();
  }, []);

  // **スクロールで追加データを取得**
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

  // 仮のデータを追加
  const loadMoreCards = () => {
    setLoading(true);
    setTimeout(() => {
      setCards((prev) => [
        ...prev,
        { id: prev.length + 1, content: "新しい夢！", likes: 0 },
        { id: prev.length + 2, content: "もっと成長したい！", likes: 0 },
      ]);
      setLoading(false);
    }, 1000);
  };

  // **「いいね！」を押した時の処理**
  const handleLike = async (id: number) => {
    const updatedDreams = await likeDream(id);
    setCards(updatedDreams);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          みんなの夢を見よう！🌸
        </h2>
        {loading ? <p>読み込み中...</p> : null}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-yellow-100 rounded-2xl p-6 shadow-lg border border-gray-300 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <p className="mb-4 text-gray-700">{card.content}</p>
              <button
                className="text-yellow-500 text-3xl hover:scale-110 transition-transform cursor-pointer"
                onClick={() => handleLike(card.id)}
              >
                👍
              </button>
              <span className="text-gray-600 text-sm mt-2">{card.likes} いいね</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DreamCards;
