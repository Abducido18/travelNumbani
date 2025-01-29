const url = 'travel_recommendation_api.json';
const bookNowBtn = document.querySelector('.js-booknow-btn');
const searchInput = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-button');
const recommendationsContainer = document.querySelector('.js-recommendations-container')

const beachKeywords = [
    'beach', 'beaches', 'beahcs', 'beeaches', 'beeaach'
];
const templeKeywords = [
    'temple', 'temples', 'temmple', 'tempasl'
];

const countryKeywords = [
    'country', 'countries', 'contryes', 'contrries'
];
let travelData = []

fetch(url)
    .then(response => response.json())
    .then(data => {
        travelData = data;
    })
    .catch(error => console.log('Error', error));

bookNowBtn.addEventListener('click', () => {

})

function getRecommendations() {
    let keyword = searchInput.value.trim();

    
    if(!keyword) {
        console.log('Ingresa un dato válido');
        return;
    }
    
    const isBeachKeyword = beachKeywords.some(keywordItem => keywordItem.toLowerCase() === keyword);
    
    const isTempleKeyword = templeKeywords.some(keywordItem => keywordItem.toLowerCase() === keyword);
    
    const isCountrieKeyword = countryKeywords.some(keywordItem => keywordItem.toLowerCase() === keyword);
    
    if (isBeachKeyword) {
        console.log(travelData.beaches);
        travelData.beaches.forEach(item => {
            const card = 
            `<h1>${item.name}</h1>
             <img src="${item.imageUrl}" alt="Descripción de la imagen">
             <p>${item.description}</p>
            `
            recommendationsContainer.innerHTML += card;
        })
        
    } else if (isTempleKeyword) {
        console.log(travelData.temples);
        travelData.temples.forEach(item => {
            const card = 
            `<h1>${item.name}</h1>
             <img src="${item.imageUrl}" alt="Descripción de la imagen">
             <p>${item.description}</p>
            `
            recommendationsContainer.innerHTML += card;
        })
    } else if(isCountrieKeyword) {
        console.log(travelData.countries);
        travelData.countries.forEach(item => {
            const card = 
            `<h1>${item.name}</h1>`

            recommendationsContainer.innerHTML += card;
            item.cities.forEach(item => {
                const cityCard = `
                <img src="${item.imageUrl}" alt="Descripción de la imagen">
                <p>${item.description}</p>`
                recommendationsContainer.innerHTML += cityCard;
            })    
        })
    } else {
        console.log('No results available');
    }
}

searchBtn.addEventListener('click', getRecommendations);
