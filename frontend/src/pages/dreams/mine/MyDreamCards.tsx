import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { Dream } from "../../../types/dream";

interface MyDreamCardsProps {
  myDreams: Dream[];
}

const MyDreamCards = ({ myDreams }: MyDreamCardsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
        {myDreams.map((dream, index) => (
          <AlertDialog.Root key={index}>
          <AlertDialog.Trigger>
            <div className="border bg-white rounded-xl shadow-lg p-4 min-h-48 py-6">
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
            <Flex gap="3" justify="center">
              {/* mt 削除 */}
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
