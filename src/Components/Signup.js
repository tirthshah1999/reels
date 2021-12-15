import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Signup.css";
import insta from '../Assets/Instagram.JPG';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link,useHistory} from  'react-router-dom';

export default function Signup() {
  const useStyles = makeStyles({
    text1:{
      color:'grey',
      textAlign:'center'
    },
    card2:{
        height:'8vh',
        marginTop:'2%'
    }
  })

  const classes = useStyles();

  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
            <div className="insta-logo">
              <img src={insta} alt="logo" />
            </div>
            <CardContent>
              <Typography className={classes.text1} variant="subtitle1">
                Sign up to see photos and videos from your friends
              </Typography>
              {true && <Alert severity="error">Error</Alert>}
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth={true}
                margin="dense"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth={true}
                margin="dense"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                fullWidth={true}
                margin="dense"
                size="small"
              />
              <Button
                color="secondary"
                fullWidth={true}
                variant="outlined"
                margin="dense"
                startIcon={<CloudUploadIcon />}
                component="label"
              >
                Upload Profile Image
                <input type="file" accept="image/*" hidden />
              </Button>
            </CardContent>
            <CardActions>
              <Button color="primary" fullWidth={true} variant="contained">
                Sign up
              </Button>
            </CardActions>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              By signing up, you agree to our Terms & Conditions.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Having an account ?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
