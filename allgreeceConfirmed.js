
        
        (async () => {
const api_url = "https://covid-19-greece.herokuapp.com/confirmed";
            const response = await fetch(api_url);
            const data = await response.json();
            const casesdata = data["cases"];

})();
