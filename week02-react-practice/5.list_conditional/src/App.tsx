// Movie 인터페이스
interface Movie {
  id: number;
  title: string;
  releaseDate: string;
}

// 영화 배열
const movies: Movie[] = [
  { id: 1, title: "오디세이", releaseDate: "2026.08.05" },
  { id: 2, title: "스파이더맨", releaseDate: "2026.06.17" },
  { id: 3, title: "옵세션", releaseDate: "2026.09.15" },
];

export default function App() {
  return (
    <main>
      <h1>영화 목록</h1>
      {movies.length === 0 ? (
        <p>재시 영화가 없어요..</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} - {movie.releaseDate}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}