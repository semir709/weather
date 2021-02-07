let input = document.getElementById("town").value;
let apiKey = '&appid=aad38c8fbcc165680998b2cd7cfa2832';
let units ='&units=metric';


async function weather () {
    let response;

    if (location.protocol === 'http:') {
        response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${input}${units}${apiKey}`);
    }
    else {
        response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}${units}${apiKey}`);
    }
    
    const data = await response.json();

    return data;
}


document.getElementById('btn').addEventListener('click',function () {
    input = document.getElementById("town").value;


    weather()
    .then(data => {
        //console.log(data);

       let cty = document.getElementsByClassName("city");

       for(let i = 0; i < cty.length; i++) {
           cty[i].innerHTML = data.city.name;
       }

       getDate();
       getMainData(data);
       changeBackground(data);

    

    }).catch(function (error) {
        console.warn(error);
    })

    animationCards();
});

function animationCards() {
    let card = document.getElementsByClassName("card");
    let search = document.getElementsByClassName("search");
    let townTag = document.getElementById("town");
    let btnTag = document.getElementById("btn");

    for(let i = 0; i < card.length ; i++) {
        if(!card[i].classList.contains('show')) {

            setTimeout(function() {
                card[i].classList.add('show');
                search[0].classList.add('showSearch')
                townTag.classList.add("smallTown");
                btnTag.classList.add("smallBtn");
                
            }, 1000)
        }
        else {
           
            card[i].classList.remove('show');
            
            
            setTimeout(function() {
                card[i].classList.add('show');
                
                
            }, 1000)
            
        }
    }

}

function getDate(){

    let dateTag = document.getElementsByClassName("date");
    let daysInWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let day = new Date();

    let nextDay = new Date(day);

    for(let i = 0; i < 5; i++) {
        dateTag[i].innerHTML = daysInWeek[nextDay.getDay()] + ", " + months[nextDay.getMonth()] + " "+ nextDay.getDate(); 

        nextDay.setDate(nextDay.getDate() + 1);      
    }

}

function getMainData(data) {
    let day = new Date();
    let nextDay = new Date(day);
    let temp = document.getElementsByClassName("temp");
    let time = document.getElementsByClassName("time");
    let morningTemp = document.getElementsByClassName("morning");
    let afternoonTemp = document.getElementsByClassName("afternoon");
    let eveningTemp = document.getElementsByClassName("evening");

    let j = 0;
    let timeApi;
    let months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    let chechkTime = false;
    let setFirstday = false;
    morningTemp[0].innerHTML = "Morning temp: " + data.list[0].main.temp + "°C";
    //afternoonTemp[0].innerHTML = "Afternoon temp: " + data.list[0].main.temp + "°C";
    //eveningTemp[0].innerHTML = "Evening temp: " + data.list[0].main.temp + "°C";

    let threePeriodOFTime = {
        morning: "06:00",
        afternoon: "12:00",
        evening: "21:00" 
    };

    for(let i = 0; i < data.list.length; i++) {
        let dateApi = data.list[i].dt_txt.slice(0,10);
        let date;

        if (nextDay.getDate().toString().length - 1 > 2) {
            date = nextDay.getFullYear() + "-" +  months[nextDay.getMonth()]  + "-" + nextDay.getDate();
        }
        else{
            date = nextDay.getFullYear() + "-" +  months[nextDay.getMonth()]  + "-" +"0"+ nextDay.getDate();
        }
       

        if(chechkTime == false) {
            timeApi =  data.list[0].dt_txt.slice(10,16);
            
            chechkTime = true;
        } 

        if(date == dateApi) {
            if(threePeriodOFTime.morning ==  data.list[i].dt_txt.slice(11,16)) {
                morningTemp[j].innerHTML = "Morning temp: " + data.list[i].main.temp + "°C";
               
            }
            
            if(threePeriodOFTime.afternoon == data.list[i].dt_txt.slice(11,16)) {
                afternoonTemp[j].innerHTML = "Afternoon temp: " + data.list[i].main.temp + "°C";
                if(setFirstday == false) {
                    
                    afternoonTemp[0].innerHTML = "Afternoon temp: " + data.list[i].main.temp + "°C";
                    setFirstday = true;
                }
                
            }
    
           if(threePeriodOFTime.evening == data.list[i].dt_txt.slice(11,16)) {
               eveningTemp[j].innerHTML = "Evening temp: " + data.list[i].main.temp + "°C";

               j++;
    
                if (j > 4) break;  
            }

            if(timeApi == data.list[i].dt_txt.slice(10,16)){

                temp[j].innerHTML = data.list[i].main.temp + "°C";
                time[j].innerHTML = timeApi;
    
                getPicAndDisc(data.list[i].weather, j);
                
            }
        }
        
        if(data.list[i].dt_txt.slice(11,16) == "00:00") {
            nextDay.setDate(nextDay.getDate() + 1);
        }
    }
}

function getPicAndDisc(weatherData,index) {
    let disc = document.getElementsByClassName("desc");
    let pic = document.getElementsByClassName("pic"); 

    disc[index].innerHTML = weatherData[0].description;

    
    switch(weatherData[0].main) {
        case "Thunderstorm":
            pic[index].src = " https://openweathermap.org/img/wn/11n@2x.png"
            break;
        case "Drizzle":
            pic[index].src = " https://openweathermap.org/img/wn/09n@2x.png"
            break;
        case "Rain":
            pic[index].src = " https://openweathermap.org/img/wn/10n@2x.png"
            break;
        case "Snow":
            pic[index].src = " https://openweathermap.org/img/wn/13n@2x.png"
            break;
        case "Mist":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Smoke":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Haze":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Dust":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Fog":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Sand":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Ash":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Squall":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Tornado":
            pic[index].src = " https://openweathermap.org/img/wn/50n@2x.png"
            break;
        case "Clear":
            pic[index].src = " https://openweathermap.org/img/wn/01n@2x.png"
            break;
        case "Clouds":
            pic[index].src = " https://openweathermap.org/img/wn/02n@2x.png"
            break;
        default:
            pic[index].src = " https://openweathermap.org/img/wn/01n@2x.png"
    }
}


function changeBackground(data) {

    switch(data.list[0].weather[0].main) {
        case "Thunderstorm":
            document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/Thunderstorm.jpg) no-repeat center center fixed";
            break;
        case "Drizzle":
            document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/rainn.jpg) no-repeat center center fixed";
            break;
        case "Rain":
            document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/rainn.jpg) no-repeat center center fixed";
            break;
        case "Snow":
            document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/snoww.jpg) no-repeat center center fixed";
            break;
        case "Mist":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Smoke":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Haze":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Dust":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Fog":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Sand":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Ash":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Squall":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Tornado":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/mist.jpg) no-repeat center center fixed";
            break;
        case "Clear":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/sun.jpg) no-repeat center center fixed";
            break;
        case "Clouds":
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/cloudy.jpg) no-repeat center center fixed";
            break;
        default:
             document.documentElement.style.background = "url(https://raw.githubusercontent.com/semir709/weather/master/Images/sun.jpg) no-repeat center center fixed";
    }

}


