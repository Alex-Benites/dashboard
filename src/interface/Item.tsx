export default interface Item {
    dateStart: String;
    dateEnd: String;
    precipitation: String;
    humidity: String;
    clouds: String;
}


/*

let API_KEY = "7b1c486c081e257c8e4038d058aaf936";
let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
let savedTextXML = await response.text();
                
*/