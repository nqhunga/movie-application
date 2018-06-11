import * as React from 'react';

import { IMovieSearch } from '../../Types/Types';
import { GenreList } from '../../Api/Genre';
import { IGenre } from '../../Types/Types';
import { ListItem } from './ListItem';

interface IProps {
  getlist: IMovieSearch[],
  genre: Array<IGenre>,
  getListID: (id: number) => void
}

interface IState {
  movieid: number
}


export class List extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      movieid: null
    }
  }

  getID = (id:number) => {
    this.setState({
      movieid: id
    }, () => this.props.getListID(this.state.movieid));
    
  }

  render() {
    const { getlist, genre } = this.props;
    return (
      <div className="movie-wrapper">
        <h2>popdas:</h2>
        <div className="list-wrapper">
          {getlist.map(item => {
            return <ListItem key={item.id} listitem={item} genre={genre} getMovieID={this.getID}/>
          })
          }
        </div>
      </div>

    );
  }
}