import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function App() {

//const url="https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=d8a1ed07ef36e57cfe81412bd46f8b17"
const [data,setData]=useState({})
const [location,setLocation]=useState('');

const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d8a1ed07ef36e57cfe81412bd46f8b17`
//const url="https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d8a1ed07ef36e57cfe81412bd46f8b17"
const searchLocation=(event)=>{
    if(event.key==='Enter'){
       
    axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
    })
   
    setLocation('')
    }
};

var res; 
if(data.main && data.main.temp){                      
res=(data.main.temp-32)*5/9
}
    return (
        <div className="app">
            <div className='search'>
                <input 
                value={location} 
                type="text" 
                onChange={(event) => 
                setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Enter Location'/>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                       <p>{data.name}</p> 
                    </div>
                    <div className="temp">
                       
    
                        {data.main ? <h1>{res.toFixed()}℃  {data.weather?<h5>{data.weather[0].main}</h5>:null}
                        </h1> :null}  
                        
                    </div>
                </div>
                {data.name !==undefined &&
               <div className="bottom">

               <div className="feels">
                   {data.main ? <p className="bold">{data.main.feels_like.toFixed()}℉</p> : null}
                   <p>Feels like</p>
               </div>
              
           
               <div className="humidity">
                   {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                   <p>Humidity</p>
               </div>
               <br></br>
           
               <div className='wind'>
                   {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
                   <p>Wind Speed</p>
               </div>
               <br></br>
           
           </div>
           
                }
            </div>
        </div>
    )
}

export default App;