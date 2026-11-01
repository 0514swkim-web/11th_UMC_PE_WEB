import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import "../../App.css";

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
    <div>
      <MovieGrid movies={currentMovies} onToggleBookmark={handleToggleBookmark} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}