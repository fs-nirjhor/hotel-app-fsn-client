import * as React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LoggedUserContext } from "../../App";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import {auth} from "../../firebase.init";

const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

const theme = createTheme();

export default function Login() {
  const [loggedUser, setLoggedUser, , setMessage] = useContext(LoggedUserContext);
  const [hasAccount, setHasAccount] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    const { email, password, username} = data;
    if (!hasAccount) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          updateProfile(auth.currentUser, {
            displayName: username,
          });
          handleMessage("Account Created!", "success");
          setHasAccount(true);
        })
        .catch((error) => handleMessage(error.code, "error"));
    }
    if (hasAccount) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          updateLoggedUser(result.user);
        })
        .catch((error) => handleMessage(error.code, "error"));
    }
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        updateLoggedUser(result.user);
        console.log(loggedUser);
      })
      .catch((error) => handleMessage(error.code, "error"));
  };
  const handleFacebookLogin = () => {
    signInWithPopup(auth, FacebookProvider)
      .then((result) => {
        updateLoggedUser(result.user);
      })
      .catch((error) => handleMessage(error.code, "error"));
  };
  const updateLoggedUser = (user) => {
    handleIdToken();
    const newUser = {
      email: user.email,
      username: user.displayName,
    };
    setLoggedUser(newUser);
    const newMessage = {isOpen: true,
      text: `Welcome, ${user.displayName}!`,
      type: "success",};
      setMessage(newMessage);
    if (location.state) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };
  const handleMessage = (text, type) => {
    const newMessage = { isOpen: true, text: text, type: type };
    setMessage(newMessage);
  };
  const handleIdToken = () => {
    auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  // Send token to your backend via HTTPS
  sessionStorage.setItem("idToken",idToken);
}).catch(function(error) {
  console.log(error); 
});
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            my: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            boxShadow: "5px 10px 30px grey",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {hasAccount ? "Sign In" : "Sign Up"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Your Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2,3})\b/,
                  })}
                />
                {errors.email && <code>Enter a valid email address</code>}
              </Grid>
              {!hasAccount && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      type="text"
                      required
                      fullWidth
                      id="username"
                      label="Your Name"
                      {...register("username", {
                        required: true,
                        pattern: /^[A-Za-z]{2,30}$/,
                      })}
                    />
                    {errors.username && <code>Name is required</code>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="phone"
                      type="tel"
                      required
                      fullWidth
                      id="phone"
                      label="Your Phone Number"
                      {...register("phone", {
                        required: true,
                        pattern: /^[0-9]{11}$/,
                      })}
                    />
                    {errors.phone && (
                      <code>Enter a valid 11-digit phone number</code>
                    )}
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Your Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,16}$/,
                  })}
                />
                {errors.password && (
                  <code>
                    Password must be at least 6 characters long and contain both
                    letters and numbers
                  </code>
                )}
              </Grid>
              {!hasAccount && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Your Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="confirm-password"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) => value === watch("password"),
                      })}
                    />
                    {errors.confirmPassword && (
                      <code>Passwords do not match</code>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!hasAccount ? "Sign Up" : "Sign In"}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  {!hasAccount
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ width: "100%", my: 2 }}>
            <Chip label="OR" />
          </Divider>
          <Button
            fullWidth
            variant="contained"
            sx={{ my: 1 }}
            onClick={() => handleGoogleLogin()}
          >
            Login with Google
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ my: 1 }}
            onClick={() => handleFacebookLogin()}
          >
            Login with Facebook
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
