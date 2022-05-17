function importAll(r) {
    return r.keys().map(r);
  }
  
const images = importAll(require.context('../img/', true, /\.(png|jpe?g|svg)$/));

document.body.style.backgroundImage = "url('./img/icons/travel_plan.jpg')";
