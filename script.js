
    const key= "446b0eabf6f72c87bfeff3dfd20a20a4"
    const proxy = "https://cors-anywhere.herokuapp.com/"
    let city = document.getElementById("city")

    const searchBtn=document.getElementById("searchBtn") 
    searchBtn.addEventListener("click",e=>{
        check()
        city.value=""
    })

    city.addEventListener("keypress",e=>{
        if(e.key=="Enter"){
            check()
            city.value=""
        }
    })

 function check(){
    let api = `${proxy}api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${key}`
        fetching(api)
 }
 function fetching(api){
    fetch(api)
    .then(res=>{
    return res.json()
    })
    .then(data=>{
    
    if(data.cod != "404"){
        document.getElementById("showCity").innerText=data.name
        let weather=data.main.temp-273.15
        document.getElementById("deg").innerText=weather.toFixed(2)
        document.getElementById("weatherStatus").innerText=data.weather[0].main

        let icons=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("image").src=icons
    }
    if(data.cod=="404"){
        document.getElementById("alert").style.display="block"
    }
    })
 }


 window.addEventListener('load',()=>{
    
    navigator.geolocation.getCurrentPosition(data=>{
        let lat=data.coords.latitude
        let long=data.coords.longitude
        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`
        fetching(api)
    })
 })
 