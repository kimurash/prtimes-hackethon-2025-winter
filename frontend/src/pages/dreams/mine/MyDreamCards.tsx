import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const MyDreamCards = () => {
  // TODO: APIから夢のデータを取得する
  const dreams = [
    "世界一周旅行に行く",
    "プログラマーとして独立する",
    "自分の本を出版する",
    "家族で広い家に引っ越す",
    "カフェを開業する",
    "フルマラソンを完走する",
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
        {dreams.map((dream, index) => (
          <AlertDialog.Root key={index}>
            <AlertDialog.Trigger>
              <div className="border bg-white rounded-xl shadow-lg p-4 min-h-48 py-6">
                <p className="text-gray-800 overflow-hidden text-ellipsis">
                  {dream}
                </p>
              </div>
            </AlertDialog.Trigger>
            <AlertDialog.Content className="flex flex-col justify-between min-h-[300px] max-w-[400px]">
              <AlertDialog.Description size="4">
                {dream}
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
