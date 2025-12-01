import axios from "axios";
//import cheerio from 'cheerio';

const url = "https://www.missoun.com/";
const axiosInstance = axios.create();

axiosInstance
  .get(url)
  .then((response) => {
    const html = response.data;
    // const $ = cheerio.load(html);
    console.log(html);
  })
  .catch(console.error);
