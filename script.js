const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// function showLoadingSpinner() {
//     loader.hidden = false;
//     quoteContainer.hidden = true;
// }

// function hideLoadingSpinner() {
//     if (!loader.hidden) {
//         loader.hidden = true;
//         quoteContainer.hidden = false;
//     }
// }

// async function getQuote() {
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//     const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

//     try {
//         showLoadingSpinner();
//         const res = await fetch(proxyUrl + apiUrl);
//         const quote = await res.json();
//         quoteText.innerText = quote.quoteText;
//         authorText.innerText = quote.quoteAuthor || 'Unknown';

//         if (quote.quoteText.length > 120) {
//             quoteText.classList.addClass('long-quote');
//         } else {
//             quoteText.classList.removeClass('long-quote');
//         }
//         hideLoadingSpinner();
//     } catch (error) {
//         console.log('Oops, no quote', error);
//         getQuote();
//     }
// }

function tweetQuote() {
    const text = quoteText.innerText;
    const author = authorText.innerText;
    const url = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
    window.open(url, '_blank');
}

newQuoteBtn.addEventListener('click', () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.innerText = quote.text;
    authorText.innerText = quote.author || 'Unknown';

    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
});

twitterBtn.addEventListener('click', tweetQuote);

// getQuote();
