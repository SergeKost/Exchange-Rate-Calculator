const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
    const currencyOneValue = currencyOne.value;
    const currencyTwoValue = currencyTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/191346a1df2f5b0509ed68d8/latest/${currencyOneValue}`)
    .then(rateResponse => rateResponse.json())
    .then(rateData => {
        //console.log(rateData);
        const currentRate = rateData.conversion_rates[currencyTwoValue];

        rate.innerText = `1 ${currencyOneValue} = ${currentRate} ${currencyTwoValue}`;

        amountTwo.value = (amountOne.value * currentRate).toFixed(2);
    });

}

// Event listeners
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const tempCurrency = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = tempCurrency;
    
    calculate();
});

calculate();