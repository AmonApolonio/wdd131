let temp = 28;
let windSpeed = 3.6;
let weatherCondition = "Partly cloudy";

const calculateWindChill = (t, s) => {
    //I will use celsius but I'll keep the Fahrenheit coefficients here too
    const coefficientsFahrenheit  = {
        a: 35.74,
        b: 0.6215,
        c: 35.75,
        d: 0.4275,
    };

    const coefficientsCelsius = {
        a: 13.12,
        b: 0.6215,
        c: 11.37,
        d: 0.3965,
    };

    const { a, b, c, d } = coefficientsCelsius;

    const result = Math.round((a + b * t) - (c * s ** 0.16) + (d * t * s** 0.16));
    return result;
};

const temperatureElement = document.querySelector('#temp');
const windElement = document.querySelector("#wind");
const conditionElement = document.querySelector("#cond");
const windChillElement = document.querySelector("#windChill");

temperatureElement.textContent = `${temp}°C`;
windElement.textContent = `${windSpeed} km/h`;
conditionElement.textContent = weatherCondition;

if (temp <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temp, windSpeed);
    windChillElement.textContent = `${windChill}°C`;
} else {
    windChillElement.textContent = "N/A";
}