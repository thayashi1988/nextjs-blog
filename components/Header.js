import Link from "next/link";

const Header = () => (
  <header className="bg-blue-300">
    <div className="max-w-4xl mx-auto py-4">
      <h1><Link href="/"><a className="no-underline hover:no-underline hover:opacity-50">ヘッダー</a></Link></h1>
    </div>
  </header>
);

export default Header;