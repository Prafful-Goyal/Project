const form = document.querySelector("#searchForm");
const res = document.querySelector("#tableResult"); //THIS IS ACTUALLY DOM MANIPULATION
//for updation we need setTimeOut command that's why we need var upd variable;
var upd;
form.addEventListener("submit", (e) => {
  // By DOING THIS THING REFRESHING WILL BE PREVENTED WE NEED TO JUST ADD KEEP ON TOP
  e.preventDefault();
  if (upd) {
    clearTimeout(upd);
  }
  const ctype = form.elements.coinType.value;

  //We use this function to get the price for particular cointype value
  fetchPrice(ctype); //this function will be sync function only because whenever we fetch API we make sync function only because sync function are made because API works on some promises so it take time that's why we make sync function
});

//sync function
const fetchPrice = async (ctype) => {
  //Note:Whenever we fetch API from Axios we need to put "await" this is because we need to wait for the API'S to get fetch
  const r = await axios.get(
    `https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`
  );
  console.log(r.data.coin.price);
  //Because ctype could have any value like doge-usd,btc-usd so we need to put 'ctype' in API link but we cant't add in a simple string so we change inverted comma(') to slant inverted comma(`) which is just about the tab button

  const price = r.data.coin.price;
  const volume = r.data.coin.volume;
  const change = r.data.coin.priceChange1d;
  const base = r.data.coin.name;
  const target = "USD";

  //innerHTML will push the code inside this res or you can directly push the value of price(so it will push the code inside the selected element i.e. h5 tag in html code)
  /*
  res.innerHTML = `${price}`;//we need to remove this because we store this property in table
  */ //By this we get price on webpage after price heading which are define in html code

  // res.innerHTML = `${price}`;

  res.innerHTML = `<tr style="background-color:blue; color:white; font-weight:700">
      <td>Property</td>
      <td>Value</td>
  </tr>
  <tr>
      <td>${base}</td>
      <td>${price} ${target}</td>
  </tr>
  <tr>
      <td>Volume</td>
      <td>${volume}</td>
  </tr>
  <tr>
      <td>Change</td>
      <td>${change}</td>
  </tr>`;

  //so to update price we need to fetch price again like we do recursion in c++

  //Note: API have a limit that you can't update it more than 30 times so we need some greater milisecond
  upd = setTimeout(() => fetchPrice(ctype), 10000);
  //NOTE: TO STOP THAT PREVIOUS COIN WE SELECTED TO GET UPDATED WE HAVE TO GO ADDEVENTLISTENER WHEN WE CLICKED ON SUBMIT THING AGAIN so will we check if upd has some value so we will stop this previous timing thing
};
