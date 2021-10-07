const userID = 

function numberGen() {
  var randomId = document.getElementById("randomNum")
  randomId.innerHTML = Math.floor((Math.random() * 50000) + 10000);

  return userID;
}

module.exports = {
    numberGen,
   
}
