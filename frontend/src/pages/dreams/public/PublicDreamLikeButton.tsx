import { increasePublicDreamLikes } from "@/api/dreams/public";
import { userAtom } from "@/atoms/userAtom";
import { Dream } from "@/types/dream";
import { useAtom } from "jotai";

interface PublicDreamLikeButtonProps {
  dream: Dream;
  setPublicDreams: (dreams: Dream[]) => void;
}

const PublicDreamLikeButton = ({
  dream,
  setPublicDreams,
}: PublicDreamLikeButtonProps) => {
  const [user] = useAtom(userAtom);

  const handleLikeAddButtonClick = async (id: number) => {
    const updatedPublicDreams = await increasePublicDreamLikes(id);
    setPublicDreams(updatedPublicDreams);
  };

  const likable = user && dream.user_id !== user.id;

  return (
    <>
      <button
        className="text-yellow-500 text-3xl hover:scale-110 transition-transform cursor-pointer"
        onClick={() => handleLikeAddButtonClick(dream.id!)}
        disabled={!likable}
      >
        {likable ? "👍" : ""}
      </button>
      <span className="text-gray-600 text-sm mt-2">{dream.likes} いいね</span>
    </>
  );
};

export default PublicDreamLikeButton;
