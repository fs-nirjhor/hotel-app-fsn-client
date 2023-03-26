import { List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect, useContext } from "react";
import { LoggedUserContext } from "../../App.js";
import dayjs from "dayjs";


const BookingList = () => {
	const [loggedUser] = useContext(LoggedUserContext);
	const [bookings, setBookings] = useState([]);
	useEffect(() => {
		fetch(`http://localhost:4000/bookings?email=${loggedUser.email}`)
		.then(res => res.json())
		.then(data => {
			setBookings(data);
		})
		.catch(error => console.log(error.message));
	}, [loggedUser.email]);
return (
	<Box my={3} border={1} borderRadius={3} >
	<h3>Total Booking: {bookings.length}</h3>
	<List sx={{pb:0}} >
	{ bookings.map(booking => 
        <ListItem button divider
          key={booking._id}
          secondaryAction={
            <IconButton onClick = { () => console.log("delete") }>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText 
          primary={`${booking.username} (${booking.email})`}
          secondary= {
          <>
          	<span component="span">From: {dayjs(booking.checkInDate).format('DD/MM/YYYY')}</span>
          	<br />
          	<span>To: {dayjs(booking.checkOutDate).format('DD/MM/YYYY')}</span>
          </>
          }
          />
        </ListItem>
	)}
    </List>
	</Box>
);
};

export default BookingList;