import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { readBookmarkIds, saveBookmarkIds } from "../../utils/bookmark-storage";

export function MovieListPage() {
  const [bookmarkedMovieIds, setBookmarkedMovieIds] = useState(() => readBookmarkIds());
  const [currentPage, setCurrentPage] = useState(1);
  const movies = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));
  const moviesPerPage = 10;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage,
  );

  function handleToggleBookmark(movieId: number) {
    const nextMovieIds = bookmarkedMovieIds.includes(movieId)
      ? bookmarkedMovieIds.filter((id) => id !== movieId)
      : [...bookmarkedMovieIds, movieId];

    setBookmarkedMovieIds(nextMovieIds);
    saveBookmarkIds(nextMovieIds);
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