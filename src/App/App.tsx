import * as React from 'react';

import { List } from '../Container/Movie/List';
import { IMovieSearch } from '../Types/Types';
import { DiscoverMovie } from '../Api/DiscoverMovie';
import { GenreList } from '../Api/Genre';
import { IGenre } from '../Types/Types';
import { DrawerMenu } from '../Component/DrawerMenu/DrawerMenu';
import { EachMovie } from '../Container/Movie/EachMovie';

import CssBaseline from '@material-ui/core/CssBaseline';

interface IState {
  MovieList: IMovieSearch[],
  genreList: Array<IGenre>,
  sortBy: string,
  movieID: number,
  movieDetailList: Array<number>
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      MovieList: null,
      genreList: null,
      sortBy: 'popularity.desc',
      movieID: null,
      movieDetailList: null
    }
  }

  componentDidMount() {
    this.getDiscoverMovie(this.state.sortBy);
    this.getGenreList();
  }

  getDiscoverMovie = async (sortBy: string) => {
    try {
      const discoverMovie = await DiscoverMovie(sortBy);
      this.setState({
        MovieList: discoverMovie
      });
    } catch (err) {
      console.log(err);
    }
  }

  getGenreList = async () => {
    try {
      const result = await GenreList();
      this.setState({
        genreList: result
      })
    } catch (err) {
      console.log(err);
    }
  }

  changeDisplay = (tabName: {
    name: string,
    type: string
  }) => {
    if (tabName.type === 'movie-list') {
      this.setState({
        sortBy: tabName.name,
        movieID: null
      }, () => this.getDiscoverMovie(this.state.sortBy));
    }
  }

  getID = (id: number) => {
    const temp = [].concat(this.state.movieDetailList).filter(Number);
    if (temp.indexOf(id) === -1) { temp.push(id) };
    this.setState({
      movieID: id,
      movieDetailList: temp
    });
  }

  changeMovie = (id: number) => {
    this.setState({
      movieID: id
    });
  }

  render() {
    const { MovieList, genreList, movieID, movieDetailList } = this.state;

    return (
      <React.Fragment >
        <CssBaseline />
        <div className="content-wrapper">
          <DrawerMenu display={this.changeDisplay} getList={movieDetailList} movie={this.changeMovie} />
          {
            movieID ? <EachMovie movieID={movieID} />
              :
              <div className="main-wrapper">
                {MovieList ?
                  <List getlist={MovieList} genre={genreList} getListID={this.getID} />
                  : null
                }
              </div>
          }
        </div>
      </React.Fragment>

    );
  }
}

export default App;