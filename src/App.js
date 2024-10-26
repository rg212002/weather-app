
import './App.css';
import { useState} from 'react';
import axios from "axios";
import clouds from "./Components/Images/clouds.png";
import Clear from "./Components/Images/clear.png";
import Rain from "./Components/Images/rain.png";
import Drizzle from "./Components/Images/drizzle.png";
import Mist from "./Components/Images/mist.png";
import search from "./Components/Images/search.png";
import Wind from "./Components/Images/wind.png";
import Humidity from "./Components/Images/humidity.png";
import bckImage from "./Components/Images/backgroundimage.jpg";
import Temp from "./Components/Images/temp.png";

function App() {

  //capture varibles
  const [cel, setCel] = useState({
    //Weather varoables
    celcius: '',
    name: 'Enter Location',
    humidity: '',
    speed: '',
    image: clouds,
    description:'',
    min_temp: '',
    max_temp:''
  })
  const [name, setName] = useState('');
  const[error,setError] = useState(' ')
  

  
const handleClick = () =>{
  if(name !=="") {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=40a20b5a7afafe89ff2ad266e98ae52e&units=metric`;
    axios.get(apiUrl).then(res => {
      let imagePath = '';
      //if statement getting the weather description from API
      if(res.data.weather[0].main ==="Clouds"){
        imagePath = clouds
      }else if(res.data.weather[0].main ==="Clear"){
        imagePath = Clear
      }else if(res.data.weather[0].main ==="Rain"){
        imagePath = Rain
      }else if(res.data.weather[0].main ==="Drizzle"){
        imagePath = Drizzle
      }else if(res.data.weather[0].main ==="Mist"){
        imagePath = Mist
      }else {
        imagePath =clouds
      }
      console.log(res.data)
      //grabbing data from API
      setCel({...cel, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, 
        image: imagePath, description: res.data.weather[0].description, min_temp:res.data.main.temp_min, max_temp:res.data.main.temp_max});
      setError('');
    }) 
    //Handles invalid entry 
    .catch( err => {
      if(err.response.status === 404) {
        //Display error
        setError("Invalid City Name")
      }else{
        setError('');
      }
      //writing error to console log
      console.log(err);
  });
}
}

  return (
   //Background image
    <div className='container' style={{backgroundImage:`url(${bckImage})`}}>
      <div className='weather'>
        <div className="search">
          {/* Input for City Name*/}
          <input  placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
          <button onClick={handleClick}><img src={search} alt=''/></button>
        </div>
        <div className='error'>
          {/*Displaying error */}
          <p>{error}</p>
        </div>
        <div className='winfo'>
          {/**Temparature image */}
          <img src={cel.image} alt='' />
          {/**Weather description */}
          <p>{cel.description}</p>
          {/**Weather temperature converted from celcius to farhenheit */}
          <h1>{Math.round((cel.celcius)*9/5 +32)}° </h1>
          {/**Display City name */}
          <h2>{cel.name}</h2>
        
        <div className='details'>
          <div className='col'>
            {/**Humidity Icon */}
            <img src={Humidity} alt=''/>
            <div>
              {/**Display Humidity */}
              <p> {cel.humidity}% </p>
              <p>Humidity</p>
            </div>
          </div>
          <div className='col'>
            {/**Temperature icon */}
            <img src={Temp} alt=''/>
            <div>
              {/**Lowest temperature for the searched city */}
              <p>L {Math.round((cel.min_temp)*9/5 +32)}°</p>
              {/**Highest temperature for the searched city */}
              <p>H {Math.round((cel.max_temp)*9/5 +32)}°</p>
            </div>
          </div>
          <div className='col'>
            <img src={Wind} alt=''/>
            <div>
              {/**Wind speed, converted from meter per second to miles per hour*/}
              <p>{Math.round((cel.speed)*2.23369)} mph </p>
              <p>Wind</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
