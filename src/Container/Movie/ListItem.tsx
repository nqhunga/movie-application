import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IMovieSearch } from '../../Types/Types';
import { IGenre } from '../../Types/Types';
import * as moment from 'moment';

interface IProps {
  listitem: IMovieSearch,
  genre: Array<IGenre>,
  getMovieID: (id: number) => void
}

const POSTER_URL = 'https://image.tmdb.org/t/p/w500';


export class ListItem extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);

  }

  GenreItem = () => {
    const { genre, listitem } = this.props;

    if (genre) {
      const temp = genre.filter((x: IGenre) => {
        const check = x.id;
        const test = listitem.genre_ids;
        return test.some((c: number) => c === check)
      })
      return temp.map((v: IGenre) => v.name).join(', ');
    }
    return 'Loading..'
  }

  fixedDate = () => {
    const { genre, listitem } = this.props;
    return moment(listitem.release_date).format('MMMM Do YYYY');
  }
  getID = (x: number) => {
    this.props.getMovieID(x);
  }

  render() {
    const { listitem } = this.props;
    return (
      <Card className="card-item" onClick={() => this.getID(listitem.id)}>
        <CardMedia
          className="card-media"
          image={listitem.poster_path ? `${POSTER_URL}${listitem.poster_path}` : 'http://www.almguide.com/wp-content/themes/K-Theme/assets/images/No-image-full.jpg'}
          title="Contemplative Reptile"
        />
        <CardContent className="card-content">
          <h3>{listitem.title} <span> {listitem.vote_average.toFixed(2)}</span></h3>
          <p>{this.GenreItem()}</p>
          <i><span>Release date: </span>{this.fixedDate()}</i>
        </CardContent>
      </Card>
    );
  }
}