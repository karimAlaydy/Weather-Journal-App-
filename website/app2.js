 /* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'd275db7980e71133c7e339d841200fff'; 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();

//Adding event listener to the generate button
document.getElementById("generate").addEventListener("click", (e) =>{
    console.log('clicked');
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    if (zipCode.trim()=="" || feelings.trim()==""){
        alert("Please enter zipcode and feelings");
        return;
    }
    getTemp(baseURL, zipCode, apiKey)
    .then((data) => addData({date: newDate, temp: data.main.temp, feelings}))
    .then(()=> updateUI());
})

// To get temperature

const getTemp = async (baseURL, zipCode, apiKey) => {
    const fetchTemp = await fetch(baseURL+zipCode+"&appid="+apiKey+"&units=metric")
    try{
        const apiData = await fetchTemp.json();
        return apiData;
     } catch(error){
            console.log(error);
        }
}

// Post Request

const addData = async (data={}) => {
    const postRequest = await fetch("/addData",{
        method: "POST",
        credentials:"same-origin",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
    });
    try{
        const result = await postRequest.json();
        return result;
    } catch (error){
        console.log(error)
    }
}

//Updating Interface

const updateUI = async () =>{
    const fetchingData = await fetch("/getData");
    try{
        const data = await fetchingData.json();
        document.getElementById("date").innerHTML = data.date;
        document.getElementById("temp").innerHTML = data.temp;
        document.getElementById("content").innerHTML = data.feelings;
    } catch(error){
        console.log(error);
    }
}