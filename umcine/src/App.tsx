import { useState } from "react";
import type { Movie } from "./types/movie";
import { movies as initialMovies } from "./data/movies";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  
  const moviesPerPage = 10;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  
  // 현재 페이지의 영화들만 보여주기
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  function handleToggleBookmark(movieId: number) {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div>
      <Header />
      <MovieGrid 
        movies={currentMovies}
        onToggleBookmark={handleToggleBookmark}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}