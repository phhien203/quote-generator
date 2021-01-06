async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const res = await fetch(proxyUrl + apiUrl);
        const quote = await res.json();
        console.log(quote);
    } catch (error) {
        console.log('Oops, no quote', error);
        getQuote();
    }
}

getQuote();
