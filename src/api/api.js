import axios from 'axios';

export const instanse = axios.create({
  baseURL: 'https://quotes.instaforex.com/api/',
});

export const authAPI = {
  quotesList: () =>
    instanse
      .get(`quotesList`)
      .then(response => {
        return response.data.quotesList;
      })
      .catch(err => console.log(err)),
  quotesTick: symbol =>
    instanse
      .get(`quotesTick?q=${symbol}`)
      .then(response => {
        return response.data[0];
      })
      .catch(err => console.log(err)),
};
