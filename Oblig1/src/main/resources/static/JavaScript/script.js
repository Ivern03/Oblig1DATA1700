const bestillingArray = [];

// Input validation for the selection of different movies

function inputSjekkFilm(film){
    if(film === 'velgFilm'){
        feilmeldingFilm.innerHTML = "Velg en film!";
    }else{
        feilmeldingFilm.innerHTML = '';
        return true;
    }
}

// Input validation for the ticket amount

function inputSjekkAntall(antallSjekk){
    if(isNaN(antallSjekk)){
        feilmeldingAntall.innerHTML = "Skriv inn et gyldig tall!";
    }else if(antallSjekk < 1){
        feilmeldingAntall.innerHTML = "Du må kjøpe minst 1 billett";
    } else if (antallSjekk > 50) {
        feilmeldingAntall.innerHTML = "Du kan ikke kjøpe flere enn 50 billetter";
    }else{
        feilmeldingAntall.innerHTML =  '';
        return true;
    }
}

// Input validation for the first name

function inputSjekkFornavn(fornavn){
    if(fornavn === ''){
        feilmeldingFornavn.innerHTML = "Skriv inn et gyldig fornavn!";
    } else if (fornavn.length < 1 || fornavn.length > 30) {
        feilmeldingFornavn.innerHTML = "Fornavn kan ikke være mindre enn 1 tegn eller større enn 30 tegn";

        // Used and adapted code from: "https://stackoverflow.com/questions/16667329/special-character-validation" for testing certain characters / numbers / special characters etc in fornavn,
        // etternavn, telefonnr and email.

    } else if (!/^[a-zA-ZÆØÅæøå-]+$/.test(fornavn)) {
        feilmeldingFornavn.innerHTML = "Fornavn kan kun inneholde bokstaver, har du flere fornavn, bruk - imellom";
    } else {
        //valgtFornavn = innFornavn;
        feilmeldingFornavn.innerHTML = '';
        return true;
    }
}

// Input validation for the last name

function inputSjekkEtternavn(etternavn){
    if(etternavn === ''){
        feilmeldingEtternavn.innerHTML = "Skriv inn et gyldig etternavn!";
    } else if (etternavn.length < 1 || etternavn.length > 30) {
        feilmeldingEtternavn.innerHTML = "Etternavn kan ikke være mindre enn 1 tegn eller større enn 30 tegn";
    } else if (!/^[a-zA-ZÆØÅæøå-]+$/.test(etternavn)) {
        feilmeldingEtternavn.innerHTML = "Etternavn kan kun inneholde bokstaver, har du flere etternavn, bruk - imellom";
    } else {
        feilmeldingEtternavn.innerHTML = '';
        return true;
    }
}

// Input validation for the phone number

function inputSjekkTelefonnr(tlfnr){
    if(tlfnr === ''){
        feilmeldingTlf.innerHTML = "Skriv inn et gyldig telefonnr!";
    } else if(!/^[94]\d{7}$/.test(tlfnr)){
        feilmeldingTlf.innerHTML = "Du har skrevet inn et ugyldig telefonnr (Bare norske tlf nr er akseptable, altså 8 siffre som starter på enten 4 eller 9)";
    } else{
        feilmeldingTlf.innerHTML = '';
        return true;
    }
}

// Input validation for the Email
function inputSjekkEmail(email){
    if(email === ''){
        feilmeldingEpost.innerHTML = "Skriv inn en gyldig Epost!";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        feilmeldingEpost.innerHTML = "Du har skrevet inn en ugyldig email";
    }else{
        feilmeldingEpost.innerHTML = '';
        return true;
    }
}

function kjopBillett(){

    let innFilm = document.getElementById("filmvalg").value;
    let innAntall = parseInt(document.getElementById("antall").value);
    let innFornavn = document.getElementById("fornavn").value.trim();
    let innEtternavn = document.getElementById("etternavn").value.trim();
    let innTlf = document.getElementById("telefonnr").value;
    let innEpost = document.getElementById("epost").value.trim();

    let valgtFilm;
    let valgtAntall;
    let valgtFornavn;
    let valgtEtternavn;
    let valgtTlf;
    let valgtEpost;

    // Input validation for the different inputs

    if(inputSjekkFilm(innFilm)){
        valgtFilm = innFilm;
        feilmeldingFilm.innerHTML = '';
    }

    if(inputSjekkAntall(innAntall)){
        valgtAntall = innAntall;
        feilmeldingAntall.innerHTML =  '';
    }

    if(inputSjekkFornavn(innFornavn)){
        valgtFornavn = innFornavn;
        feilmeldingFornavn.innerHTML = '';
    }

    if(inputSjekkEtternavn(innEtternavn)){
        valgtEtternavn = innEtternavn;
        feilmeldingEtternavn.innerHTML = '';
    }

    if(inputSjekkTelefonnr(innTlf)){
        valgtTlf = innTlf;
        feilmeldingTlf.innerHTML = '';
    }

    if(inputSjekkEmail(innEpost)){
        valgtEpost = innEpost;
        feilmeldingEpost.innerHTML = '';
    }

    // Checking if all inputs are valid, then pushing the inputs into the bestillingArray, which then gets printed out into the table "utBilletter"

    if(inputSjekkAntall(innAntall) && inputSjekkEtternavn(innEtternavn) && inputSjekkFilm(innFilm) && inputSjekkFornavn(innFornavn) && inputSjekkTelefonnr(innTlf) && inputSjekkEmail(innEpost)){
        utBilletter.style.visibility = "visible";
        bestillingArray.push({filmKey:valgtFilm, antallKey: valgtAntall, fornavnKey: valgtFornavn, etternavnKey: valgtEtternavn, tlfKey: innTlf, epostKey: innEpost});
        populateHTML(bestillingArray);
    }

    // Resets/empties the insert fields

    filmvalg.value = "velgFilm";
    antall.value = "";
    fornavn.value = "";
    etternavn.value = "";
    telefonnr.value = "";
    epost.value = "";

    console.log(bestillingArray);
}

// The function that prints out the array

function populateHTML(bestillingArray) {

    let tbody = document.getElementById("tableBody");

    // Clear existing rows so that the rows won't be duplicated visually.

    tbody.innerHTML = '';

    // Loop through the array and create a row for each new entry (for every new movie order)

    for (let i in bestillingArray) {

        // Creates a new row in tbody

        let newRow = tbody.insertRow();

        // Create cells for the new row and add data to them

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);
        let cell6 = newRow.insertCell(5);

        cell1.innerHTML = bestillingArray[i].filmKey;
        cell2.innerHTML = bestillingArray[i].antallKey;
        cell3.innerHTML = bestillingArray[i].fornavnKey;
        cell4.innerHTML = bestillingArray[i].etternavnKey;
        cell5.innerHTML = bestillingArray[i].tlfKey;
        cell6.innerHTML = bestillingArray[i].epostKey;
    }
}

// Empties the array

function slettBiletter(){
    bestillingArray.length = 0;
    tableBody.innerHTML = "";
    utBilletter.style.visibility = "hidden";
}