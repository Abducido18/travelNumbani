const url = 'travel_recommendation_api.json';
const bookNowBtn = document.querySelector('.js-booknow-btn');
const searchInput = document.querySelector('.js-search-input');
const searchBtn = document.querySelector('.js-search-button');
const recommendationsContainer = document.querySelector('.js-recommendations-container');
const clearBtn = document.querySelector('.js-clear-button');

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



function getRecommendations() {
    let keyword = searchInput.value.trim();
    clear();
    
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
            `   
            <div class="card">
                <img src="${item.imageUrl}" alt="preview img"/>
                <div class="card-body">
                    <h2 class="card-title">${item.name}</h2>  
                    <p class="card-text">${item.description}</p>
                </div>
            </div>
            `
            recommendationsContainer.innerHTML += card;
        })
        
    } else if (isTempleKeyword) {
        console.log(travelData.temples);
        travelData.temples.forEach(item => {
            const card = 
            `   
            <div class="card">
                <img src="${item.imageUrl}" alt="preview img"/>
                <div class="card-body">
                    <h2 class="card-title">${item.name}</h2>  
                    <p class="card-text">${item.description}</p>
                </div>
            </div>
            `
            recommendationsContainer.innerHTML += card;
        })
    } else if (isCountrieKeyword) {
        
        for (let i = 0; i < 2; i++) {
            const card = `<h1>${travelData.countries[i].cities[i].name}</h1>`;
            recommendationsContainer.innerHTML += card;
            const cityCard = `
            <div class="card">
                <img src="${travelData.countries[i].cities[i].imageUrl}" alt="preview img"/>
                <div class="card-body">
                    <h2 class="card-title">${travelData.countries[i].cities[i].name}</h2>
                    <p class="card-text">${travelData.countries[i].cities[i].description}</p>
                </div>
            </div>
            `;
            recommendationsContainer.innerHTML += cityCard;
        }
    
    } else {
        console.log('No results available');
    }
}

function clear() {
    recommendationsContainer.innerHTML = ''
}


clearBtn.addEventListener('click', clear);
searchBtn.addEventListener('click', getRecommendations);

