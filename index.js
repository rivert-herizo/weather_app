import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

const api_key = 'Copy your own openWeather apikey here';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

app.use(bodyParser.urlencoded({ extension : true }));

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const config = {
    appid : api_key
}

app.get('/', async (req, res) => {
    try {
        const response =  await axios.get(API_URL, {
            params : {
                q: 'Antananarivo',
                appid : api_key
            }
        });
        console.log(response.data);
        res.render('index.ejs');
    }
    catch (error) {
        console.log(error);
    }
});


app.post('/find', async (req, res) => {
    try {
        const response =  await axios.get(API_URL, {
            params : {
                q: capitalizeFirstLetter(req.body.city),
                appid : api_key
            }
        });

        const result = response.data;
        const weather = result.weather[0];
        const main = weather.main;
        const city = result.name;
        res.render('index.ejs', {weather: main, city : city});
    }
    catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log("This is working")
})
