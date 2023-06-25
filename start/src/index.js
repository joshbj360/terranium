import axios from '../node_modules/axios'//1
// campi del form
const form = document.querySelector('.form-data')
const region = document.querySelector('.region-name')
const apiKey = document.querySelector('.api-key')

// risultati
const errors = document.querySelector('.errors')
const loading = document.querySelector('.region-name')
const results = document.querySelector('.api-key')
const usage = document.querySelector('.carbon-usage')
const fossilFuel = document.querySelector('.fossil-fuel')
const myregion = document.querySelector('.my-region')
const clearBtn = document.querySelector('.clear-btn')

//6
async function displayCarbonUsage(apiKey, region) {
    try {
        await axios
            .get('https://api.co2signal.com/v1/latest', {
                params: {
                    countryCode: region
                },
                headers: {
                    'auth-token': apiKey
                }
            })
            .then((response) => {
                let CO2 = Math.floor(response.data.data.carbonIntensity)

                //clculate the CO2
                usage.textContent =
                    Math.round(response.data.data.carbonIntensity) + ' grams (grams C02 emitted per kilowatt hour)';
                fossilfuel.textContent =
                    response.data.data.fossilFuelPercentage.toFixed(2) +
                    '% (percentage of fossil fuels used to generate electricity)';
                results.style.display = 'block'
            })
    } catch (error) {
        console.log(error)
        loading.style.display = 'none'
        result.style.display = 'none'
        errors.textContent = 'Sorry, we have no data for the region you have requested'
    }
}
//chiamata API

//5
//imposta la chiave api e la regione per l'utente

//4
// gestisce l'invio del form

//3 controlli iniziali
function init() {
    //if anything is in localStorage, pick it up
    const storedApiKey = localStorage.getItem('apiKey')
    const storedRegion = localStorage.getItem('region-name')

    if (storedApiKey === null || storedRegion === null) {
        form.style.display = 'block'
        results.style.display = 'none'
        loading.style.display = 'none'
        clearBtn.style.display = 'none'
        errors.textContent = ''
    } else {
        //if we have saved keys in the storage, ow the results when they load
        displayCarbonUsage(storedApiKey, storedRegion)
        results.style.display = 'none'
        form.style.display = 'none'
        clearBtn.style.display = 'none'
    }
}

function reset(e) {
    e.preventDefault()
    localStorage.removeItem('regionName')
    init()
}

function handleSubmit(e) {
    e.preventDefault()
    setUpUser(apiKey.value, region.value)
}

function setUpUser(apiKey, regionName) {
    localStorage.setItem('apiKey', apiKey)
    localStorage.setItem('regionName', regionName)
    loading.style.display = 'block'
    errors.textContent = ''
    clearBtn.style.display = 'block'

    //make initial call
    displayCarbonUsage(apiKey, regionName)
}

//2
// imposta i listeners e la partenza dell'app
form.addEventListener('submit', (e) => handleSubmit(e))
clearBtn.addEventListener('click', (e) => reset(e))
init()