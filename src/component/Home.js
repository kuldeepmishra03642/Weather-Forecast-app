import React, { useEffect, useState } from 'react'

function Home() {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(()=>{
        const fetchWeather = async () =>{
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8ca12e49f1a3193a6a375fbe3285885f`);
          if(componentMounted){
            setData(await response.json());
            console.log(data);
          }
          return () =>{
            componentMounted = false;
            
          }
        }
        fetchWeather();
      }, [search]);
      let emoji = null;
      if(typeof data.main != "undefined"){
        if(data.weather[0].main === "Clouds"){
            emoji = "fa-cloud"
        }else if(data.weather[0].main === "Thunderstorm"){
            emoji = "fa-bolt"
        }else if(data.weather[0].main === "Drizzle"){
            emoji = "fa-cloud-rain"
        }else if(data.weather[0].main === "Rain"){
            emoji = "fa-cloud-showers-heavy"
        }else if(data.weather[0].main === "Snow"){
            emoji = "fa-snowflake"
        }else {
            emoji = "fa-smog"
        }
    }
else{
     return (
        <div>...Loading</div>
     )     
    }
      

let temp = (data.main.temp - 273.15).toFixed(2);
let temp_min = (data.main.temp_min - 273.15).toFixed(2);
let temp_max = (data.main.temp_max - 273.15).toFixed(2);

// date

let d= new Date();
let date = d.getDate();
let year = d.getFullYear();
let month = d.toLocaleString("default", {month:'long'});
let day = d.toLocaleString("default", {weekday:'long'});

//time
let time = d.toLocaleString([],{
      hour : '2-digit',
      minute : '2-digit',
      second : '2-digit' 
});
    
const handleSubmit =(event)=>{
    event.preventDefault();
    setSearch(input);
}
  return (
    <div>
      <div className='container my-5'>
        <div className='row justify-content-center'>
          <div className='w-100'>
            <div className="card text-bg-dark text-center">
              <div className="card-img-overlay bg-opacity-50">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input type="text" 
                    className="form-control" 
                    placeholder="Location" 
                    aria-label="Location"
                    name="search"
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    required 
                    aria-describedby="basic-addon2" />
                    

                    <button type='submit' className='input-group-text btn btn-secondary' id='basic-addon2'>
                      <i className='fas fa-search'></i>
                    </button>
                  </div>

                </form>
                <div className='bg-dark bg-opacity-50 py-3'>
                <h2 className="card-title">{data.name}</h2>
                <p className="card-text">
                {day}, {month} {date}, {year}
                <hr/>
                Time: {time}
                </p>
                <hr />
                <i className={`fas ${emoji} fa-4x`}></i>
                <h1 className='fw-bolder mb-5'> {temp}&deg;C</h1>
                <hr/>
                <p className='lead fw-bolder mb-0'>{data.weather[0].main}</p>
                <p className='lead'>Min: {temp_min}&deg;C | Max: {temp_max}&deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home