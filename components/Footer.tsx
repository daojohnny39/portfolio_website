export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E1E] py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-[#444444]">
          © {new Date().getFullYear()} Nhat (Johnny) Dao
        </p>
        <p className="text-xs text-[#333333]">Built with Next.js</p>
      </div>
    </footer>
  );
}
