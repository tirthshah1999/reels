import React,{useState, useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import './Login.css';
import insta from '../Assets/Instagram.JPG'
import TextField from '@mui/material/TextField';
import {Link} from  'react-router-dom';
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import { AuthContext } from '../Context/Auth';
import { useHistory } from 'react-router-dom';

function Login() {
    const useStyles = makeStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },
        text2:{
            textAlign:'center'
        },
        card2:{
            height:'8vh',
            marginTop:'2%'
        }
    })

    const classes = useStyles();
    const store = useContext(AuthContext);
    console.log(store);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {login} = useContext(AuthContext);

    const handleLogin = async() => {
        try {
            setError("");
            setLoading(true);
            let res = await login(email, password);
            setLoading(false);
            history.push('/');
        } catch (err) {
            setError("Credentials doesn't match");
            setLoading(false);
            setTimeout(() => {
                setError("");
            }, 2000)
        }
    }

    return (
        <div className="loginWrapper">
            <div className="img-card" style={{backgroundImage:'url('+bg+')',backgroundSize:'cover'}}>
                <div className="card">
                  <CarouselProvider
                      visibleSlides={1}
                      totalSlides={5}
                      naturalSlideWidth={238}
                      naturalSlideHeight={423}
                      hasMasterSpinner
                      isPlaying={true}
                      infinite={true}
                      dragEnabled={false}
                      touchEnabled={false}
                    >
                      <Slider>
                      <Slide index={0}><Image src={img1}/></Slide>
                      <Slide index={1}><Image src={img2}/></Slide>
                      <Slide index={2}><Image src={img3}/></Slide>
                      <Slide index={3}><Image src={img4}/></Slide>
                      <Slide index={4}><Image src={img5}/></Slide>
                      </Slider>
                  </CarouselProvider>
                </div>
            </div>
            <div className="loginCard">
              <Card variant="outlined">
                  <div className="insta-logo">
                      <img src={insta} alt="" />
                  </div>
                  <CardContent>
                      {error !== '' && <Alert severity="error">{error}</Alert>}
                      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <TextField type="password" id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </CardContent>
                  <CardActions>
                      <Button color="primary" fullWidth={true} variant="contained" onClick={handleLogin} disabled={loading}>
                      Log in
                      </Button>
                  </CardActions>
              </Card>
              <Card variant="outlined" className={classes.card2}>
                  <CardContent>
                      <Typography className={classes.text1} variant="subtitle1">
                          Don't have an account ? <Link to="/signup" style={{textDecoration:'none'}}>Signup</Link>
                      </Typography>
                  </CardContent>
              </Card>
            </div>
        </div>
      
    );
}

export default Login
