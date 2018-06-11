import * as React from 'react';
import Youtube from 'react-youtube';
import { MovieDetail, Trailer, Cast } from '../../Api/MovieDetail';
import { IMovie, ICast, ITrailer } from '../../Types/Types';
import Button from '@material-ui/core/Button';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import Cancel from '@material-ui/icons/Cancel';

interface IProps {
  movieID: number
}

interface IState {
  detail: IMovie,
  trailer: Array<ITrailer>,
  cast: ICast,
  displayTrailer: boolean,
  movieID: number
}

const POSTER_URL = 'https://image.tmdb.org/t/p/original/';
const POSTER_URL_CAST = 'https://image.tmdb.org/t/p/w500/';

export class EachMovie extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      detail: null,
      trailer: null,
      cast: null,
      displayTrailer: false,
      movieID: this.props.movieID
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.movieID !== nextProps.movieID) {
      this.setState({ movieID: nextProps.movieID },
        () => {
          this.getMovieDetail(this.state.movieID);
          this.getMovieCast(this.state.movieID)
        }
      )
    }
  }

  componentDidMount() {
    this.getMovieDetail(this.props.movieID);
    this.getMovieCast(this.props.movieID);
  }

  getMovieDetail = async (movieID: number) => {
    const result = await MovieDetail(movieID);
    this.setState({
      detail: result
    })
  }

  getMovieTrailer = async (movieID: number) => {
    const result = await Trailer(movieID);
    this.setState({
      trailer: result
    });
  }

  getMovieCast = async (movieID: number) => {
    const result = await Cast(movieID);
    this.setState({
      cast: result
    })
  }


  showTrailer = () => {
    const { movieID } = this.state;
    this.setState({
      displayTrailer: true
    }, () => {
      this.getMovieTrailer(this.state.movieID);
    });
  }

  cancelTrailer = () => {
    this.setState({
      displayTrailer: false,
      trailer: null
    });
  }

  GenreItem = () => {
    const { detail } = this.state;
    if (detail) {
      return detail.genres.map(v => v.name).join(', ');
    }
    return 'Loading..'
  }

  getCreditList = () => {
    const { cast } = this.state;
    if (cast) {
      return cast.cast.map(v => {
        return <div className="credit-item" key={v.id}>
          <img src={`${POSTER_URL_CAST}${v.profile_path}`} />
          <p>{v.name}</p>
          <p>{this.fixedText(v.character)}</p>
        </div>
      });
    }
    return 'Loading..'
  }

  fixedText = (x: string) => {
    const result = { textString: '' };
    (x.length >= 20) ?
      result.textString = x.substr(0, 20) + '...' :
      result.textString = x;
    return result.textString;
  }

  getMoney = () => {
    const { detail } = this.state;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    return <div>
      <p>Budget: {formatter.format(detail.budget)}</p>
      <p>Revenue: {formatter.format(detail.revenue)}</p>
    </div>
  }

  displayMovieDetail = () => {
    const { detail, cast } = this.state;
    if (detail && cast) {
      return (
        <div className="movie-info">
          <div className="info-upper">
            <img src={`${POSTER_URL}${detail.backdrop_path}`} />
            <div className="title-info">
              <h3>{detail.title}</h3>
              <span>{detail.vote_average}</span>
              <p>{this.GenreItem()}</p>
              <p>{detail.overview}</p>
              {this.getMoney()}
              <Button variant="raised" color="primary" onClick={this.showTrailer}>
                <PlayCircleOutline />Primary
              </Button>
            </div>
          </div>
          <div className="info-lower">
            <h4>Casting:</h4>
            <div className="credit-list">{this.getCreditList()}</div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { trailer, detail, cast, displayTrailer } = this.state;
    return (
      <div className={displayTrailer ? "main-wrapper fixedScroll" : "main-wrapper"}>
        {this.displayMovieDetail()}
        {trailer && displayTrailer ?
          <div className="trailer-wrapper" onClick={this.cancelTrailer}>
            <Cancel className="cancel-icon" onClick={this.cancelTrailer}/>
            <Youtube className="youtube-trailer" videoId={trailer[0].key} />
          </div>
          :
          null
        }
      </div>
    );
  }
}