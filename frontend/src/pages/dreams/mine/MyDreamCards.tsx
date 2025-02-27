import { Dream } from "../../../types/dream";

interface MyDreamCardsProps {
  myDreams: Dream[];
}

const MyDreamCards = ({ myDreams }: MyDreamCardsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
        {myDreams.map((dream, index) => (
          <div key={index} className="border bg-white rounded-xl shadow-lg p-4 min-h-48 py-6 relative">
            <p className="text-gray-800 overflow-hidden text-ellipsis">
              {dream.title}
            </p>
            <p className="text-gray-600 mt-2">{dream.content}</p>
            {dream.is_public && (
              <p className="text-green-500 font-medium mt-2 text-sm border-t pt-5 text-center">
                いいね {dream.likes}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MyDreamCards;
