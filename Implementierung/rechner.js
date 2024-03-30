// Datum darf nicht in der Zukunft liegen
document.getElementById('smokeStopDay').max = new Date().toISOString().split('T')[0];

// Toggle der Vorteile
function toggleBenefit() {
    this.classList.toggle('active');

    // Überprüfe ob Text angezeigt werden soll
    if (this.classList.contains('active')) {
        // Element mit class:benefit-text in den sichtbaren Bereich scrollen
        var benefitText = this.querySelector('.benefit-text');
        if (benefitText) {
            benefitText.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// ausfuhren wenn der button geklickt wird
document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var calculateButton = document.getElementById("calculateButton");
    calculateButton.classList.add("blink");

    setTimeout(function () {
        calculateButton.classList.remove("blink");
    }, 300);

    // Speicher alle Eingaben vom nutzer
    var smokeStopDay = new Date(document.getElementById('smokeStopDay').value);
    var dailyCigarettes = parseInt(document.getElementById('dailyCigaretes').value);
    var cigarettesPerPack = parseInt(document.getElementById('cigaretesPerPack').value);
    var packPrice = parseFloat(document.getElementById('packPrice').value);
    // Berechnung der vergangenen Tage
    var today = new Date();
    var timeDifference = today - smokeStopDay;
    var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // Berechnen der finanziellen Vorteile
    var timeSaved = (dailyCigarettes * 3 * daysDifference); // Minuten
    var d = Math.floor(timeSaved / 1440); // 60*24
    var h = Math.floor((timeSaved - (d * 1440)) / 60);
    var m = Math.round(timeSaved % 60);

    var savedMoney = ((dailyCigarettes / cigarettesPerPack) * packPrice) * daysDifference;
    var interestGain = savedMoney + ((savedMoney * 0.04) / 365) * daysDifference;
    // Finanzielle Vorteile zeigen
    document.getElementById('zeitErspart').textContent = d.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' Tage, ' + h.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' Stunden, ' + m.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' Minuten (3min pro Zigarette)';
    document.querySelector('.financial').style.display = 'block';
    document.getElementById('geldErspart').textContent = savedMoney.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }) + ' (Kosten der Zigaretten)';
    document.getElementById('zinsGewinn').textContent = interestGain.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }) + ' (Zinsgewinn + Geldersparnis)';

    // Gesundheitliche Vorteile anzeigen
    document.querySelector('.health').style.display = 'block';
    var benefits = document.querySelectorAll('.benefit');

    // Entferne event listener
    benefits.forEach(function (benefit) {
        benefit.removeEventListener('click', toggleBenefit);
    });

    // Fuge event listener hinzu
    benefits.forEach(function (benefit) {
        benefit.addEventListener('click', toggleBenefit);
    });

    updateBenefitColor('1Tag', daysDifference >= 1);
    updateBenefitColor('14Tage', daysDifference >= 14);
    updateBenefitColor('30Tage', daysDifference >= 30);
    updateBenefitColor('1Jahr', daysDifference >= 365);
    updateBenefitColor('5Jahre', daysDifference >= 1825);
    updateBenefitColor('15Jahre', daysDifference >= 5475);
});

function updateBenefitColor(benefitId, condition) {
    document.getElementById(benefitId).style.color = condition ? 'black' : 'lightgray';
}