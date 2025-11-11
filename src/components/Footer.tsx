export default function Footer() {
  const year = 2025; // 或者您可以定期更新這個值

  return (
    <footer className="py-4">
      <div className="container mx-auto text-center">
        &copy; {year} 市長/tantuyu. All rights reserved.
      </div>
    </footer>
  );
}
