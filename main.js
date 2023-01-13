let fromCurrency = document.getElementById('from-currency');
let fromAmountInput = document.getElementById('from-amount');
let toCurrency = document.getElementById('to-currency');
let toAmountInput = document.getElementById('to-amount');
let btnConvert = document.getElementById('convert-btn');
let contentCurrency = document.querySelectorAll('.content-currency');

fromAmountInput.value = 1;


//Fetch convert:
let fetchConvert = async(param) => {
  const fetchUrlConvert = await fetch(`https://api.exchangerate.host/convert?` + new URLSearchParams(param));
  const dataConvert = await fetchUrlConvert.json();

  let results = await dataConvert.result;
  console.log({results})
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

  //primer1 / nacin1:

  // let from = fromCurrency.selectedOptions[0].label;
  // let to = toCurrency.selectedOptions[0].label;
  // let inputOne = fromAmountInput.value;
  // let firstInput = Math.floor(inputOne);
  
  // let conversionRate = await fetchConvert(from, to);

  // let convert = conversionRate * firstInput;
  // toAmountInput.value = convert.toFixed(2);


  //primer2 / nacin2:
  let fetchParamObj = {
    from: fromCurrency.selectedOptions[0].label,
    to: toCurrency.selectedOptions[0].label,
    amount: fromAmountInput.value,
    places: 2
  };

  let amountForSecondInputField = await fetchConvert(fetchParamObj);
  toAmountInput.value = amountForSecondInputField;
});
