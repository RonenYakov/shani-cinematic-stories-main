const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-black/10 py-6">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs text-black/60">
          © {year} כל הזכויות על כל התוכן הוויזואלי באתר שייכות לשני בסה
        </p>
      </div>
    </footer>
  );
};

export default Footer;


