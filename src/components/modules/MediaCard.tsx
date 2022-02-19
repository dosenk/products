import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { IProduct } from '../../models/IProduct';
import { makeStyles } from '@mui/styles';
import { sliceDescription, sliceTitle } from '../../utils/utils';
import { NavLink } from 'react-router-dom';

interface IMediaCard {
  product: IProduct;
}

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 400,
    minHeight: 360,
    margin: '25px 10px',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: '0.2s'
    }
  },
  cardMedia: {
    margin: '0 auto'
  }
}));

const MediaCard: FC<IMediaCard> = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        image={product.image}
        height="180"
        alt="card-image"
        className={classes.cardMedia}
        sx={{ objectFit: 'scale-down' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sliceTitle(product.title ?? '')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sliceDescription(product.description ?? '')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <NavLink to={`products/${product.id}`}>Read more</NavLink>
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
