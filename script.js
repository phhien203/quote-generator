const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const res = await fetch(proxyUrl + apiUrl);
        const quote = await res.json();
        quoteText.innerText = quote.quoteText;
        authorText.innerText = quote.quoteAuthor || 'Unknown';

        if (quote.quoteText.length > 120) {
            quoteText.classList.addClass('long-quote');
        } else {
            quoteText.classList.removeClass('long-quote');
        }
    } catch (error) {
        console.log('Oops, no quote', error);
        getQuote();
    }
}

function tweetQuote() {
    const text = quoteText.innerText;
    const author = authorText.innerText;
    const url = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
    window.open(url, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// getQuote();
