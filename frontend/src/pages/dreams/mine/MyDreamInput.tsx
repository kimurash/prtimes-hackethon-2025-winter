import { useState } from "react";

const MyDreamInput = () => {
  const [dream, setDream] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleTogglePrivacy = () => {
    setIsPublic((prev) => !prev);
  };

  const handleSave = () => {
    console.log("保存:", { dream, isPublic });
    // TODO: 必要ならAPIに送信する処理を追加
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div className="w-3/4 md:w-2/3 lg:w-1/2 border border-black rounded-lg p-4 min-h-[200px] flex items-center justify-center">
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="夢を書き込んでください"
          className="w-full h-40 resize-none p-2 border-none focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleTogglePrivacy}
          className={`px-6 py-2 rounded-full text-white ${
            isPublic ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {isPublic ? "公開" : "非公開"}
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-md bg-green-300 hover:bg-green-400 transition"
        >
          保存する
        </button>
      </div>
    </div>
  );
};

export default MyDreamInput;
