import roomData from "../../roomData";
import Rooms from "../Rooms/Rooms";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <Container maxWidth="lg">
    <Grid
      container
      spacing={2}
      justifyContent="space-around"
      alignItems="stretch"
    >
      {roomData.map((room) => (
        <Rooms room={room} key={room.bedType} />
      ))}
    </Grid>
    </Container>
  );
};

export default Home;
