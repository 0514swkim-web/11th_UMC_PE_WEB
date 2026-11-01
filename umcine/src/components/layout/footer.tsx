export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-end gap-2 px-6 text-xs text-gray-500">
        <img src="/images/images/logos/tmdb-logo.svg" alt="TMDB" className="h-3" />
        <p>
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <span className="underline">TMDB</span>.
        </p>
      </div>
    </footer>
  );
}