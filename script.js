const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

function updateQuoteToHtml(text, author) {
    quoteText.innerText = text;
    authorText.innerText = author || 'Unknown';

    if (text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
}

const maxRetries = 5;
let retries = 0;

async function getQuote() {
    const proxyUrl = 'https://sheltered-river-42247.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        showLoadingSpinner();

        const res = await fetch(proxyUrl + apiUrl);
        const quote = await res.json();

        updateQuoteToHtml(quote.quoteText, quote.quoteAuthor);

        hideLoadingSpinner();
    } catch (error) {
        console.log('Oops, no quote', error);
        retries++;

        if (retries < maxRetries) {
            console.log('Retry', retries);
            getQuote();
        } else {
            console.log('Get quote from local');
            retries = 0;
            const localQuote = quotes[Math.floor(Math.random() * quotes.length)];
            updateQuoteToHtml(localQuote.text, localQuote.author);
            hideLoadingSpinner();
        }
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

getQuote();
