const Footer = () => {
  return (
    <footer className="border-t border-[#0a2473] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-center text-sm text-[#51a2ff]">
            Made with <span className="text-red-500">❤️</span> by Shriharsh.
          </span>
          <p className="text-[#51a2ff]">
            &#169; {new Date().getFullYear()} Sigma-AI. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
