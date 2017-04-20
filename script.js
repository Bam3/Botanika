var ustvariRozo = function(ime, stanje){
  //ustvarimo nov element "DIV" in mu dodao class "vrstica"
  var novaVrstica = document.createElement("div")
  novaVrstica.classList.add("vrstica")
  // ustvarimo nov element "DIV" in mu dodamo class "ime"
  var novoIme = document.createElement("div")
  novoIme.classList.add("ime")
  //doda tekst v div ime, ki ga pobere iz prvega parametra funkcije (string)
  novoIme.append(ime)

  var novoStanje = document.createElement("div")
  novoStanje.classList.add("stanje")
  novoStanje.append(stanje)
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
ustvariRozo("Figov fikus", "Preveč zalito - odcedi")
ustvariRozo("Spatifil", "ODLIČNO HIDRIRAN")

fetch('https://api.myjson.com/bins/1fhow7')
  .then(response => response.json())
  .then(function(roze) {
    console.log('Tukaj so naše rože!', roze);
  })
