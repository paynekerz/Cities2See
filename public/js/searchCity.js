
// function formSubmit() {
//     tempHolder.innerHTML = "";
//     cityName = input_City.value;
//     console.log(cityName);
//     getCoords(cityName);
//   }



  document.querySelector('#searchCity').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      console.log("City Entered")
    }
});