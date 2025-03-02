import { useState } from "react";
import { createDream, fetchMyDreams } from "../../../api/dreams/mine";
import { Dream } from "../../../types/dream";

interface MyDreamInputProps {
  setMyDreams: (dreams: Dream[]) => void;
}

const MyDreamInput = ({ setMyDreams }: MyDreamInputProps) => {
  const [dream, setDream] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handlePrivacyToggleClick = () => {
    setIsPublic((prev) => !prev);
  };

  const handleSaveButtonClick = async () => {
    try {
      const newDream = {
        title: dream,
        content: dream,
        is_public: isPublic,
        likes: 0,
      };
      await createDream(newDream);

      const myDreams: Dream[] = await fetchMyDreams();
      setMyDreams(myDreams);

      setDream("");
    } catch (e) {
      alert("夢の保存に失敗しました");
      console.error(e);
    }
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
          onClick={handlePrivacyToggleClick}
          className={`px-6 py-2 rounded-full text-white ${
            isPublic ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {isPublic ? "公開" : "非公開"}
        </button>
        <button
          onClick={handleSaveButtonClick}
          className="px-6 py-2 rounded-md bg-green-300 hover:bg-green-400 transition"
        >
          保存する
        </button>
      </div>
    </div>
  );
};

export default MyDreamInput;
