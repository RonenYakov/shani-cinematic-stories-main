const BackToTopButton = () => {

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Back to top"
      onClick={toTop}
      className="fixed buttom bottom-6 center z-[100] w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm ring-1 ring-white/25 shadow-xl transition"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

export default BackToTopButton;


