// 1. MovieTitle 컴포넌트
function MovieTitle() {
  return <h2>오디세이</h2>;
}

// 2. MovieCard 컴포넌트
function MovieCard() {
  return (
    <article>
      <MovieTitle />
      <p>개봉일: 2026.08.05</p>
    </article>
  );
}

// 2-2. MovieCard2 컴포넌트
function MovieCard2() {
  return (
    <article>
      <h2>스파이더맨</h2>
      <p>개봉일: 2026.06.10</p>
    </article>
  );
}

// 2-3. MovieCard3 컴포넌트
function MovieCard3() {
  return (
    <article>
      <h2>옵세션</h2>
      <p>개봉일: 2026.09.15</p>
    </article>
  );
}

// 3. Header 컴포넌트
function Header() {
  return <h1>영화 목록</h1>;
}

// 4. MovieList 컴포넌트
function MovieList() {
  return (
    <section>
      <MovieCard />
      <MovieCard2 />
      <MovieCard3 />
    </section>
  );
}

// 5. App 컴포넌트 (최상위)
export default function App() {
  return (
    <main>
      <Header />
      <MovieList />
    </main>
  );
}