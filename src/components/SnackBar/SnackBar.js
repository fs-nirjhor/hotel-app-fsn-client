import { useContext, forwardRef } from "react";
import { LoggedUserContext } from "../../App";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = () => {
  const [, , message, setMessage] = useContext(LoggedUserContext);

  const vertical = "top";
  const horizontal = "center";

  const handleOnClose = () => {
    const newMessage = { ...message };
    newMessage.isOpen = false;
    setMessage(newMessage);
  };

  return (
    <Snackbar
      open={message.isOpen}
      autoHideDuration={10000}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      onClose={() => handleOnClose()}
      TransitionComponent={TransitionUp}
    >
      <Alert
        onClose={() => handleOnClose()}
        severity={message.type}
        sx={{ width: "100%" }}
      >
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
