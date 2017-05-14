/* funkcija iz prejetih podatkov ustvarja nove elemente, ki jih ob koncu z gnezdenjem (starši in otroci) poveže v en element (rastlina s podatki on njeni trenutni zalitosti)
in jih pripne staršu v html-ju (seznam) s čimer postanejo viden element naše spletne strani*/
var ustvariRozo = function(ime, stanje){
  var novaVrstica = ustvariElement("div", "vrstica")
  var novoIme = ustvariElement("div", "ime", ime)
  /* od senzorjev dobimo "surov" podatek o zalitosti, zato to število na tem mestu pretvorimo v lažje razumljive odstotke;
  za razliko od zgornjih dveh ustvarjenih elementov temu dodamo še en class, ki določi barvo krogca pri stopnji zalitosti */
  var novoStanje = ustvariElement("div", "status", Math.round(stanje * 100) + "%")
  novoStanje.classList.add(dolociKlasStatus(stanje))
  // tukaj staršu (novaVrstica) pripnemo najprej enega otroka (novoIme), nato pa še drugega (novoStanje)
  novaVrstica.append(novoIme)
  novaVrstica.append(novoStanje)
  /* v tem delu z document.querySelector v html datoteki poiščemo element s classom "seznam" in ga shranimo v spremenljivko "stars";
  element s classom "seznam" bo starš elementu novaVrstica, ki mu ga v oklepaju pripnemo/appendamo;
  s tem se rastlina izdelana v funkciji ustvariRozo pojavi/je vidna na naši spletni strani */
  var stars = document.querySelector(".seznam")
  stars.append(novaVrstica)
}

var prejmiPodatke = function(roze) {
  // najprej razvrstimo roze po stopnji zalitosti
  roze = roze.sort(razvrstiPoZalitosti);
  // nato za vsako rastlino s seznama poženemo funkcijo ustvariRozo
  for (var i = 0; i < roze.length; i++) {
    ustvariRozo(roze[i].name, roze[i].status)
  }
}

// funkcija, ki določi slog (barvo gumba) iz css-ja glede na podatek (dobi od senzorja) o stopnji vlažnosti prsti posamezne rastline
var dolociKlasStatus = function(stanje) {
  if (stanje < 0.25) {
    return "status-red"
  }
  else if (stanje >= 0.25  && stanje <= 0.75) {
    return "status-yellow"
  }
  else if (stanje > 0.75) {
    return "status-green"
  }
}

// funkcija, ki razvrsti podatke o zalitosti, ki jih dobi od serverja (s senzorjev), od najmanjšega do največjega (najbolj žejna rastlina na vrhu seznama)
var razvrstiPoZalitosti = function(prva, druga){
  return prva.status - druga.status;
}

/* splošna funkcija za ustvarjanje elementov s tremi parametri;
samo prvi (tag) ima nastavljeno default vrednost, ostali parametri se z if stavki nastavijo samo v primeru, da jih ob klicanju funkcije podamo;
default vrednost je smiselno nastavit samo tam, kjer jo nujno rabimo za to, da se funkcija pravilno izvede */
var ustvariElement = function(tag = "div", klas, besedilo){
  var novElement = document.createElement(tag);
  if (klas) {
    novElement.classList.add(klas);
  }
  if (besedilo) {
    novElement.append(besedilo);
  }
  return novElement
}

// šele tukaj se začne koda izvajati, najprej s "fetch" dobimo seznam rastlin, nato se sproži prva funkcija prejmiPodatke
fetch('https://api.myjson.com/bins/1fhow7')
  .then(response => response.json())
  .then(prejmiPodatke)
