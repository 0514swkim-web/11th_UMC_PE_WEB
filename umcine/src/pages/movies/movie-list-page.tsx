import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage,
  );

  function handleToggleBookmark(movieId: number) {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movieId ? { ...m, isBookmarked: !m.isBookmarked } : m,
      ),
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">영화 목록</h1>
      <MovieGrid movies={currentMovies} onToggleBookmark={handleToggleBookmark} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}