var ustvariRozo = function(ime, stanje){
  //ustvarimo nov element "DIV" in mu dodao class "vrstica"
  var novaVrstica = document.createElement("div")
  novaVrstica.classList.add("vrstica")
  // ustvarimo nov element "DIV" in mu dodamo class "ime"
  var novoIme = document.createElement("div")
  novoIme.classList.add("ime")
  //doda tekst v div ime, ki ga pobere iz prvega parametra funkcije (string)
  novoIme.append(ime)
  // Ustvarimo nov element, ki bo služil za prikazovanje stanja
  var novoStanje = document.createElement("div")
  // Elementu dodelimo univerzalni Class za status
  novoStanje.classList.add("status")
  // S funkcijo dodamo Class ki pobarva stanje glede na zalitost
  novoStanje.classList.add(dolociClassStatus(stanje))
  // Izračunamo še procente zalitosti.
  novoStanje.append(Math.round(stanje * 100) + "%")
  // append združi v novoVrstico, novoIme in novoStanje, sta soseda
  novaVrstica.append(novoIme)
  novaVrstica.append(novoStanje)
  // append porine v bodi novoVrstico
  //document.body.append(novaVrstica)
  // v seznam shrani class seznam
  var starsi = document.querySelector(".seznam")
  //ker smo dali class seznam v starse z appendom porinemo novoVrstico v seznam
  starsi.append(novaVrstica)
}

var prejmiPodatke = function(roze) {
  //najprej razvrstimo roze
  roze = roze.sort(razvrstiPoZalitosti);
  //nato jih izrišemo
  for (var i = 0; i < roze.length; i++) {
    ustvariRozo(roze[i].name, roze[i].status)
  }
  //console.log('Tukaj so naše rože!', roze);
}
// funkcija ki izbira stil glede na podatke vlažnosti rastline
var dolociClassStatus = function(stanje){
  if (stanje < 0.25) {
    return "status-red"
  }
  if (0.25 <= stanje && stanje <= 0.75) {
    return "status-yellow"
  }
  if (stanje > 0.75) {
    return "status-green"
  }
}
//funkcija, ki razvrsti podatke iz srverja po velikosti od najmanjšega statusa do največjega
var razvrstiPoZalitosti = function(prva, druga){
  return prva.status - druga.status;
}
fetch('https://api.myjson.com/bins/1fhow7')
  .then(response => response.json())
  .then(prejmiPodatke)
