import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { deleteDream, fetchMyDreams } from "../../../api/dreams/mine";
import { Dream } from "../../../types/dream";

interface MyDreamCardsProps {
  myDreams: Dream[];
  replaceMyDreams: (newMyDreams: Dream[]) => void;
}

const getPinkGradientClass = (likes: number): string => {
  if (likes >= 100) {
    return "to-pink-500";
  } else if (likes >= 70) {
    return "to-pink-400";
  } else if (likes >= 50) {
    return "to-pink-300";
  } else if (likes >= 30) {
    return "to-pink-200";
  } else if (likes >= 10) {
    return "to-pink-100";
  } else {
    return "to-pink-50";
  }
};

const MyDreamCards = ({ myDreams, replaceMyDreams }: MyDreamCardsProps) => {
  const handleDeleteButtonClick = async (dreamId: number) => {
    await deleteDream(dreamId);
    const myDreams = await fetchMyDreams();
    replaceMyDreams(myDreams);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
        {myDreams.map((dream, index) => (
          <AlertDialog.Root key={index}>
            <div className="relative">
              <AlertDialog.Trigger>
                <div
                  // prettier-ignore
                  className={`
                  border rounded-xl shadow-lg p-4 min-h-48 py-6 bg-gradient-to-b from-white
                  ${getPinkGradientClass(dream.likes)}
                  `}
                >
                  <Flex justify="between">
                    <div className="text-gray-800 overflow-hidden text-ellipsis">
                      {dream.title}
                    </div>
                  </Flex>
                  {dream.is_public && (
                    <div className="text-green-500 font-medium mt-2 text-sm border-t pt-5 text-center">
                      いいね {dream.likes}
                    </div>
                  )}
                </div>
              </AlertDialog.Trigger>
              <button
                className="absolute top-5 right-5 z-10"
                onClick={() => {
                  handleDeleteButtonClick(dream.id!);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <AlertDialog.Content className="flex flex-col min-h-[300px] max-w-[400px]">
              <AlertDialog.Title>{dream.title}</AlertDialog.Title>
              <div className="mb-auto">
                <AlertDialog.Description size="4">
                  {dream.content}
                </AlertDialog.Description>
              </div>
              <Flex gap="3" justify="center" direction="column" align="center">
                <p className="text-center font-bold">
                  ＼発信して夢を叶えよう！／
                </p>
                <Flex gap="2" justify="center">
                  <FacebookShareButton
                    url={window.location.href}
                    title={dream.content}
                    hashtag="#AprilDream"
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={dream.content}
                    hashtags={["AprilDream"]}
                  >
                    <XIcon size={40} round />
                  </TwitterShareButton>
                </Flex>
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    閉じる
                  </Button>
                </AlertDialog.Cancel>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        ))}
      </div>
    </>
  );
};

export default MyDreamCards;
