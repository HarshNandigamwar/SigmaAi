const Header = () => {
  const gradientTextClass =
    "p-1 text-3xl md:text-4xl font-extrabold tracking-tight " +
    "bg-clip-text text-transparent mb-2 " +
    "bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-600";
  return (
    <header className="p-4 bg-[#1e1e1e] shadow-xl text-center ">
      <h1 className={gradientTextClass}>Sigma AI</h1>
    </header>
  );
};

export default Header;
