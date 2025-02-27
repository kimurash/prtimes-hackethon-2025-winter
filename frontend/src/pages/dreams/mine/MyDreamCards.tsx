import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { Dream } from "../../../types/dream";

interface MyDreamCardsProps {
  myDreams: Dream[];
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

const MyDreamCards = ({ myDreams }: MyDreamCardsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
        {myDreams.map((dream, index) => (
          <AlertDialog.Root key={index}>
            <AlertDialog.Trigger>
              <div
                // prettier-ignore
                className={`
                  border rounded-xl shadow-lg p-4 min-h-48 py-6 bg-gradient-to-b from-white
                  ${getPinkGradientClass(dream.likes)}
                `}
              >
                <p className="text-gray-800 overflow-hidden text-ellipsis">
                  {dream.title}
                  {dream.is_public && (
                    <p className="text-green-500 font-medium mt-2 text-sm border-t pt-5 text-center">
                      いいね {dream.likes}
                    </p>
                  )}
                </p>
              </div>
            </AlertDialog.Trigger>
            <AlertDialog.Content className="flex flex-col justify-between min-h-[300px] max-w-[400px]">
              <AlertDialog.Description size="4">
                {dream.content}
              </AlertDialog.Description>
              <Flex gap="3" justify="center" direction="column" align="center">
                <p className="text-center font-bold">
                  ＼発信して夢を叶えよう！／
                </p>
                <Flex gap="2" justify="center">
                  <FacebookShareButton
                    url={window.location.href}
                    title={dream.title}
                    hashtag="#AprilDream"
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={dream.title}
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
