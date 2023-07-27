const button=document.querySelector("button")

button.addEventListener("click", ()=>{

   if(navigator.geolocation){ 
    //if browser support geolocation api
  
        button.innerText="Allow to detect location......"
   
navigator.geolocation.getCurrentPosition(onSuccess, onError);
   }else{
    button.innerText="Your Browser not support"
   }
})

//geolocation.getCurrentPosition method is usedto get current position of the device.
//It takes three paramenters Success, error, option.
//if everything is right then success callback function is called else error callback will call. 
//we dont need third parameter for this projec

function onSuccess(position){
    button.innerText="Dectecting Your Location....."
let {latitude, longitude}=position.coords;
//https://opencagedata.com/api

//https://opencagedata.com/api

const apiKey=`8421dfeb292943be8fb17a2c749cf5be`;

fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
.then(response=>response.json()).then(result=>{
    console.log(result)
    let allDetails=result.results[0].components;
    let{suburb,city,state_district,state, postcode}=allDetails;
    console.log(suburb,city,state_district,state, postcode)
    if(`${suburb}`==="undefined" || `${city}`==="undefined"){
        button.innerText=`${postcode} ${state_district} ${state}`
    }else{
        button.innerText=`${suburb} ${city}  ${postcode} ${state_district} ${state}`
    }
   
console.table(allDetails)
}).catch(()=>{
    button.innerText="Something Went Wrong"
})
}
function onError(error){
   if(error.code==1){
    button.innerText="You denied the request"
   } else if(error.code==2){
    button.innerText="Location not available";
   } else{
    button.innerText="Something went wrong"
   }
   button.setAttribute("disabled", "true")
}


