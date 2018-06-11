import * as React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { MovieDetail } from '../../Api/MovieDetail';
import { IMovie } from '../../Types/Types';

interface IProps {
  display: (tabName: {
    name: string,
    type: string
  }) => void,
  getList: Array<number>,
  movie: (id: number) => void
}

interface IState {
  tabName: {
    name: string,
    type: string
  },
  trend: boolean,
  release: boolean,
  rating: boolean,
  list: Array<IMovie>,
  listID: Array<number>,
  currentDisplayMovie: number
}

const MovieIcon = (props: {
  movie: IMovie,
  id: number,
  current: number,
  chooseMovie: (id: number) => void
}) => {
  const { movie, id, current, chooseMovie } = props;
  return <ListItem onClick={() => chooseMovie(movie.id)} className={current === movie.id ? "menu-list-button active" : "menu-list-button"} button>
    <ListItemText className="menu-list-item" inset primary={movie.title} />
  </ListItem>
}

const POSTER_URL = 'https://image.tmdb.org/t/p/w300/';

export class DrawerMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      tabName: {
        name: null,
        type: null
      },
      trend: true,
      release: false,
      rating: false,
      listID: this.props.getList,
      list: [],
      currentDisplayMovie: null
    }
  }

  tabTrend = () => {
    this.setState({
      tabName: {
        name: 'popularity.desc',
        type: 'movie-list'
      },
      trend: true,
      release: false,
      rating: false,
      currentDisplayMovie: null
    }, () => {
      this.display();
    });
  }

  tabRevenue = () => {
    this.setState({
      tabName: {
        name: 'revenue.desc',
        type: 'movie-list'
      },
      trend: false,
      release: true,
      rating: false,
      currentDisplayMovie: null
    }, () => {
      this.display();
    });
  }

  tabRating = () => {
    this.setState({
      tabName: {
        name: 'vote_average.desc',
        type: 'movie-list'
      },
      trend: false,
      release: false,
      rating: true,
      currentDisplayMovie: null
    }, () => {
      this.display();
    });
  }

  display = () => {
    this.props.display(this.state.tabName);
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.getList !== nextProps.getList) {
      this.setState({ listID: nextProps.getList },
        () => this.listMovieDetail()
      )
    }
  }

  getMovieDetail = async (id: number) => {
    if (id) {
      const temp = [].concat(this.state.list);
      const result = await MovieDetail(id);
      if (temp.some(v => v.id === result.id) === false) {
        temp.push(result);
        this.setState({
          list: temp
        })
      }
    }
  }

  listMovieDetail = () => {
    const { listID } = this.state;
    if (listID) {
      this.state.listID.forEach((v) => {
        this.getMovieDetail(v);
      });
    }
  }

  chooseMovie = (id: number) => {
    this.setState({
      currentDisplayMovie: id
    }, () => this.props.movie(this.state.currentDisplayMovie));
  }

  renderMovieListIcon = () => {
    const { currentDisplayMovie } = this.state;
    return this.state.list.map(v => {
      return <MovieIcon key={v.id} movie={v} id={v.id} current={currentDisplayMovie} chooseMovie={this.chooseMovie} />
    });
  }

  render() {
    const { list } = this.state;
    return (
      <List component="nav" className="menu-wrapper">
        <ListItem onClick={this.tabTrend} className="menu-list-button" button>
          <ListItemText className="menu-list-item" inset primary="Trending" />
        </ListItem>
        <ListItem onClick={this.tabRevenue} className="menu-list-button" button>
          <ListItemText className="menu-list-item" inset primary="High Revenue" />
        </ListItem>
        <ListItem onClick={this.tabRating} className="menu-list-button" button>
          <ListItemText className="menu-list-item" inset primary="High Rating" />
        </ListItem>
        <Divider />
        {list ? this.renderMovieListIcon() : null}
      </List>
    );
  }
}
