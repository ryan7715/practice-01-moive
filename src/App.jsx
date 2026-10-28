import { useState } from "react";
import "./App.moduile.css";

function App() {
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("5");
    const [genre, setGenre] = useState("액션");

    const addMovie = e => {
        e.preventDefault();

        if (title.trim() === "") {
            alert("영화 제목을 입력해주세요!");
            return;
        }

        const movie = {
            id: Date.now(),
            title,
            rating: Number(rating),
            genre,
            completed: false,
        };

        setList([...list, movie]);
        setTitle("");
        setRating("5");
        setGenre("액션");
    };

    const deleteMovie = id => {
        setList(list.filter(movie => movie.id !== id));
    };

    const toggleCompleted = id => {
        setList(
            list.map(movie =>
                movie.id === id ? { ...movie, completed: !movie.completed } : movie,
            ),
        );
    };

    return (
        <div className="container">
            <h1 className="main-title">영화 기록장</h1>

            <fieldset className="movie-form">
                <legend>새 영화 추가</legend>

                <form onSubmit={addMovie}>
                    <input
                        className="title-input"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="영화 제목 입력"
                    />

                    <select
                        className="rating-select"
                        value={rating}
                        onChange={e => setRating(e.target.value)}>
                        {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>
                                {n}점
                            </option>
                        ))}
                    </select>

                    <select
                        className="genre-select"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}>
                        {["액션", "SF", "로맨스", "코미디", "공포", "드라마", "스릴러"].map(g => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>

                    <button className="add-button" type="submit">
                        영화 추가
                    </button>
                </form>
            </fieldset>

            <div className="movie-count">
                <p>전체 영화: {list.length}편</p>
                <p>감상 완료: {list.filter(m => m.completed).length}편</p>
            </div>

            <fieldset className="movie-list">
                <legend>영화 목록</legend>

                {list.length === 0 ? (
                    <p className="empty-message">등록된 영화가 없습니다.</p>
                ) : (
                    <ul>
                        {list.map(movie => (
                            <li className="movie-card" key={movie.id}>
                                <h3>{movie.title}</h3>
                                <p>평점: {"⭐".repeat(movie.rating)}</p>
                                <p>장르: {movie.genre}</p>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={movie.completed}
                                        onChange={() => toggleCompleted(movie.id)}
                                    />
                                    관람 완료
                                </label>

                                <button
                                    className="delete-button"
                                    type="button"
                                    onClick={() => deleteMovie(movie.id)}>
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </fieldset>
        </div>
    );
}

export default App;
