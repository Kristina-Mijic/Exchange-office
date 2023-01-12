let fromCurrency = document.getElementById('from-currency');
let fromAmountInput = document.getElementById('from-amount');
let toCurrency = document.getElementById('to-currency');
let toAmountInput = document.getElementById('to-amount');
let btnConvert = document.getElementById('convert-btn');
let contentCurrency = document.querySelectorAll('.content-currency');

fromAmountInput.value = 1;


//Fetch convert:
let fetchConvert = async(from, to) => {
  const fetchUrlConvert = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`);
  const dataConvert = await fetchUrlConvert.json();

  let results = await dataConvert.result;
  return results;
};

fromAmountInput.addEventListener('click' ,() => {
  fromAmountInput.select()
});

//Disable second input field
toAmountInput.addEventListener('click', () => {
  toAmountInput.disabled = true;
});


//Fetch currency dropdown:
let fetchCurrencyDropDown = async() => {

  const fetchCurrencyUrl = await fetch(`https://api.exchangerate.host/symbols`);
  const dataCurrency = await fetchCurrencyUrl.json();
  let dataSymbols = dataCurrency.symbols;

  let keyArr = [];
  let keys = Object.keys(dataSymbols);
      
  for(let i = 0; i < keys.length; i++) {
    keyArr.push(keys[i]);
  }

  let templateCurrency = createAllCurrency(keyArr);
  fromCurrency.innerHTML = templateCurrency;
  toCurrency.innerHTML = templateCurrency;
};
fetchCurrencyDropDown();



//Template who create currency from dropdown-menu:
let createAllCurrency = (data) => {
  let templateCurrency = '';
  data.map(e => {
    templateCurrency +=
    `
    <option class="content-currency" value="">${e}</option>
    `
  });
  return templateCurrency;
};


//Button for convert currency dropDown and input field:
btnConvert.addEventListener('click', async() => {
  let from = fromCurrency.selectedOptions[0].label;
  let to = toCurrency.selectedOptions[0].label;
  let inputOne = fromAmountInput.value;
  let firstInput = Math.floor(inputOne);
  
  let conversionRate = await fetchConvert(from, to);

  let convert = conversionRate * firstInput;
  toAmountInput.value = convert.toFixed(2);
});
