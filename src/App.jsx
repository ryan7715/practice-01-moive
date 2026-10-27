import {useState} from "react";

function App() {
    const [list, setList] = useState([

    ]);

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("5");
    const [genre, setGenre] = useState("액션");

    // 영화 추가
    const addMovie = (e) => {
        e.preventDefault();

        if (title.trim() === "") {
            alert("영화 제목을 입력해주세요!");
            return;
        }

        const newMovie = {
            id: Date.now(),
            title: title,
            rating: Number(rating),
            genre: genre,
            completed: false
        };

        setList([...list, newMovie]);
        setTitle("");
        setRating("5");
        setGenre("액션");
    };

    // 영화 삭제
    const deleteMovie = (id) => {
        setList(list.filter((movie) => movie.id !== id));
    };

    // 관람 완료 상태 변경
    const toggleCompleted = (id) => {
        setList(
            list.map((movie) =>
                movie.id === id
                    ? {...movie, completed: !movie.completed}
                    : movie
            )
        );
    };

    return (
        <>
            <h1>나의 영화 기록장</h1>

            {/* 영화 추가 폼 */}
            <fieldset>
                <legend>새 영화 추가</legend>

                <form onSubmit={addMovie}>
                    <p>
                        <label>
                            영화 제목:{" "}
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="영화 제목 입력"
                            />
                        </label>
                    </p>

                    <p>
                        <label>
                            평점:{" "}
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <option key={star} value={star}>
                                        {"⭐".repeat(star)} ({star}점)
                                    </option>
                                ))}
                            </select>
                        </label>
                    </p>

                    <p>
                        <label>
                            장르:{" "}
                            <select
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            >
                                <option value="액션">액션</option>
                                <option value="SF">SF</option>
                                <option value="로맨스">로맨스</option>
                                <option value="코미디">코미디</option>
                                <option value="드라마">드라마</option>
                                <option value="공포">공포</option>
                                <option value="스릴러">스릴러</option>
                            </select>
                        </label>
                    </p>

                    <button type="submit">영화 추가</button>
                </form>
            </fieldset>

            {/* 영화 목록 */}
            <fieldset>
                <legend>Movie</legend>

                <p>전체 영화: {list.length}편</p>
                <p>
                    감상 완료: {list.filter((movie) => movie.completed).length}편
                </p>

                <ul>
                    {list.map(() => {}
                    )}
                </ul>
            </fieldset>

            <fieldset style={{display: "flex",
                flexWrap: "wrap"}}>
                <div style={{display: "flex"}}>
                <ul>
                    {list.map((movie) => (
                        <li key={movie.id}>
                            <h3>{movie.title}</h3>

                            <p>
                                평점: {"⭐".repeat(movie.rating)}
                                {" "}({movie.rating}점)
                            </p>

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
                                type="button"
                                onClick={() => deleteMovie(movie.id)}
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
                </div>

                {list.length === 0 && <p>등록된 영화가 없습니다.</p>}
            </fieldset>
        </>
    );
}

export default App;