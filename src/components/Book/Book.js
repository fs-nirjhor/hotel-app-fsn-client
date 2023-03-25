import { useParams } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { useContext, useState } from "react";
import { LoggedUserContext } from "../../App.js";
import dayjs from "dayjs";
import 'dayjs/locale/en-gb';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Book = () => {
  const [loggedUser, , , setMessage] = useContext(LoggedUserContext);
  const { bedType } = useParams();
  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const handleBooking = () => {
  	const booking = {...loggedUser, checkInDate, checkOutDate}
  	fetch(`http://localhost:4000/add-booking`, {
  		method: "POST", 
  		body: JSON.stringify(booking),
  		headers: {"Content-type": "application/json; charset=UTF-8"}
  	})
  	.then(res => res.json())
  	.then(data => {
  		if (data) {
  		const newMessage = {
          isOpen: true,
          text: "Booking successful!",
          type: "success",
        };
        setMessage(newMessage);
  		}
  	})
  	.catch(error => console.log(error.message));
  };

  return (
    <Container maxWidth="xs" className="book-page">
      <h2>Wellcome {loggedUser.username}</h2>
      <h3>
        Are You Ready To Book A <i>{bedType}</i> Room ?
      </h3>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Check in"
            value={checkInDate}
            disablePast
            onChange={(newDate) => setCheckInDate(newDate)}
          />
          <DatePicker
            label="Check out"
            value={checkOutDate}
            disablePast
            onChange={(newDate) => setCheckOutDate(newDate)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button variant="contained" sx={{ mt: 3 }} onClick = {handleBooking} >
        {bedType ? "Confirm Your Booking" : "Add A Room"}
      </Button>
    </Container>
  );
};

export default Book;

