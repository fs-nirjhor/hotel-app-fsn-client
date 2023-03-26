import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import HotelIcon from "@mui/icons-material/Hotel";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';

export default function Rooms(props) {
  const { title, description, image, capacity, bedType, avatar, bed, price } =
    props.room;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia component="img" height="194" image={image} alt={bedType} />
      <CardContent sx={{height: 75}}>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions >
        <IconButton>
          <HotelIcon/><small >: {bed}</small>
        </IconButton>
        <IconButton>
          <PersonIcon/><small>: {capacity}</small>
        </IconButton>
        <IconButton>
          <AttachMoneyIcon/><small>: {price}</small>
        </IconButton>
          <Button variant="contained">
            <Link to={`/booking/${bedType}`}>Book</Link>
          </Button>
      </CardActions>
    </Card>
    </Grid>
  );
}
