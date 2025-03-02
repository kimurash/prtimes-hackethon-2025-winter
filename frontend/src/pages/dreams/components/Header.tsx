const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-200 via-pink-200 to-red-200 text-black py-4 px-6 flex justify-between items-center shadow-md">
      {/* ロゴ */}
      <h1 className="text-2xl font-bold">DreamSink</h1>

      {/* メニュー */}
      <nav>
        <div className="flex space-x-6 text-lg">
          <a
            href="/dreams/public"
            className="hover:text-white transition-colors cursor-pointer"
          >
            みんなのメモ
          </a>
          <a
            href="/"
            className="hover:text-white transition-colors cursor-pointer"
          >
            自分のメモ
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
