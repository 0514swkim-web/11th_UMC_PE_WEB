export default function App() {
  const movieTitle = "욱과함께";
  const genre = "모험";
  const releaseDate = "2026.08.05";
  const rating = 8.5;
  const isAvailable = true;

  return (
    <article className="movie-card">
      <h1>{movieTitle}</h1>
      <p>장르: {genre}</p>
      <p>개봉일: {releaseDate}</p>
      <p>평점: {rating}/10</p>
      <p>예매 가능: {isAvailable ? "예" : "아니오"}</p>
    </article>
  );
}