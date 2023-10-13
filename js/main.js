let searchInput = document.getElementById('searchInput');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday"];


searchInput.addEventListener('input',function(){
    console.log(searchInput.value);
    getData(searchInput.value)
})

let forcastList=[];
let currentCity='';
let currentCondition=''
let currentDegree;
let currenHourConditionText=''
let tomorrowCondition=''
let tomorrowConditionText=''
let tomorrowMaxDeg;
let tomorrowMinDeg;
let afterTomorrowCondition=''
let afterTomorrowConditionText=''
let afterTomorrowMaxDeg;
let afterTomorrowMinDeg;
let d=new Date()
navigator.geolocation

// -----------Function Btgeb El Data Mn El API----------------
async function getData(q=getLocation()){

    let myHttp= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${q}&days=7`)
    let data=await myHttp.json()
    forcastList=data.forecast.forecastday;
    currentCity=data.location.name;

    currentCondition=data.current.condition.icon;
    currentDegree=data.current.temp_c;
    currenHourConditionText=data.current.condition.text;

    tomorrowCondition=data.forecast.forecastday[1].day.condition.icon; 
    tomorrowConditionText=data.forecast.forecastday[1].day.condition.text;
    tomorrowMaxDeg=data.forecast.forecastday[1].day.maxtemp_c;
    tomorrowMinDeg=data.forecast.forecastday[1].day.mintemp_c;


    afterTomorrowCondition=data.forecast.forecastday[2].day.condition.icon; 
    afterTomorrowConditionText=data.forecast.forecastday[2].day.condition.text;
    afterTomorrowMaxDeg=data.forecast.forecastday[2].day.maxtemp_c;
    afterTomorrowMinDeg=data.forecast.forecastday[2].day.mintemp_c;

    // console.log('https:'+data.forecast.forecastday[0].day.condition.icon)

    displayDataCurrentWeather();

    // console.log(currentCity);
    // console.log(data);
    // console.log(forcastList);
    
}
// -------------------------------------------------------------
getData()
// ----------------btrg3 el tare5----------

// console.log(d);
// console.log(months[d.getMonth()]);
// console.log(d.getDate()+months[d.getMonth()]);
// console.log(days[d.getDay()]);


// --------function btrg3ly el nextDay w el afterNextDay---------------------
let numDay=d.getDay();
function retDay(numDay){
  if(numDay<=6){
    return numDay
  }
  else if( numDay == 7 ){
    let x=numDay;
    x = 0;
    return x
  }
}
// ---------------------------------------------------------------------

// -----------Function Bt3rd El Data Fe El Card bta3t el current day-----------------
function displayDataCurrentWeather(){
    let temp='';
    temp = `  <div class="card-day col-md-4 text-info">
    <div class="card border-0">
      <div class="card-header bg-dark text-info d-flex justify-content-between align-items-center ">
        <p class="m-0">${days[d.getDay()]}</p>
        <p class="m-0">${d.getDate()+months[d.getMonth()]}</p>
      </div>
      <div class="card-body bg-secondary">
        <h5 class="card-title text-info">
          ${currentCity}
        </h5>
        <span class="card-text ">${currentDegree}<sup>o</sup>C</span>
        <img class="w-25" src="https:${currentCondition}" alt="">
        <p class="text-info">${currenHourConditionText}</p>

        <img src="images/image-downloader4.png" alt="">
        <span class="align-middle text-info">20%</span>

        <img class="ms-3" src="images/image-downloader5.png" alt="">
        <span class="align-middle text-info me-3">18km/h</span>

        <img src="images/image-downloader6.png" alt="">
        <span class="align-middle text-info">East</span>

      </div>
    </div>
</div>           



<div class="card-day col-md-4 text-info">
            <div class="card border-0 text-center">
              <div class="card-header bg-dark text-info text-center ">
              ${days[retDay(numDay)+1]}
              </div>
              <div class="card-body bg-secondary">
                <img class="w-25 d-block m-auto" src="https:${tomorrowCondition}" alt="">
                <p class="card-text-tomrrow ">${tomorrowMaxDeg}<sup>o</sup>C</p>
                <p class="card-text-tomrrow fs-5 ">${tomorrowMinDeg}<sup>o</sup></p>
                <p class="text-info pb-4">${tomorrowConditionText}</p>
              </div>
            </div>
        </div>


        <div class="card-day col-md-4 text-info">
            <div class="card border-0 text-center">
              <div class="card-header bg-dark text-info text-center ">
              ${days[retDay(numDay)+2]}
              </div>
              <div class="card-body bg-secondary">
                <img class="w-25 d-block m-auto" src="https:${afterTomorrowCondition}" alt="">
                <p class="card-text-tomrrow ">${afterTomorrowMaxDeg}<sup>o</sup>C</p>
                <p class="card-text-tomrrow fs-5 ">${afterTomorrowMinDeg}<sup>o</sup></p>
                <p class="text-info pb-4">${afterTomorrowConditionText}</p>
              </div>
            </div>
        </div>
`
   
document.getElementById('informationCard').innerHTML=temp;
}
// console.log(d.getDay());

// getData('cairo')

// let d= new Date(forcastList[0].date)
// console.log(days[d.getDay()]);



//------------------------------- function btrg3 el Location---------------------------
function getLocation(){
    
navigator.geolocation.getCurrentPosition(showPosition)

function showPosition(position){
    console.log(position.coords.latitude+','+position.coords.longitude);
    getData(`${position.coords.latitude+','+position.coords.longitude}`)
    return position.coords.latitude+','+position.coords.longitude
 
}
}
