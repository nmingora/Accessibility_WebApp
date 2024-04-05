// config.js
// This is only to change the url that the other components are sending requests to


// Determine the base URL dynamically
// For local development, it might be localhost; for production, it's the VM's external IP or domain


function getMyIp() {
    //use ipify API to retrieve ip hosting the web app
    fetch('https://api.ipify.org?format=json')
      .then(response => {
        return response.json();
      })
      .then(res => {
        const myIP = `http://${res['ip']}`;
        console.log(myIP);
        //set env variable
        process.env.REACT_APP_BACKEND_APP = myIP;
        return myIP;
      })
      .catch((err) => console.error('Problem fetching my IP', err));
}

const BASE_URL = getMyIp() || 'http://localhost:3005';

//const BASE_URL = process.env.REACT_APP_BACKEND_APP || 'http://localhost:3005';
export { BASE_URL };
