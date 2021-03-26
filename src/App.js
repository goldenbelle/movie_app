import React from 'react';
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
    state = {
        isLoading: true,
        movies: []
    }

    getMovies = async () => {
        const { data: { data: {movies} } } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
        this.setState( { movies, isLoading: false });
    }

    componentDidMount() {
        this.getMovies();
    }

    render() {
        const { isLoading, movies } = this.state;
        return (
            <section className="container">
                { isLoading ? (
                <div className="loader">
                    <span className="loader__text">Loading</span>
                </div> )
                : (
                <div className="movies">
                    {movies.map( data => (
                    <Movie 
                    key={data.id} 
                    id={data.id} 
                    year={data.year} 
                    title={data.title} 
                    summary={data.summary} 
                    poster={data.medium_cover_image}
                    genres={data.genres}
                    />
                    ))}
                </div>
                )}
            </section>
        );
    }
}

export default App;