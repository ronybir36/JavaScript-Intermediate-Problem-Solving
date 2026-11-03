const min = document.getElementById('min');
const max = document.getElementById('max');
const genBtn = document.getElementById('generate');
const resetBtn = document.getElementById('reset');
const randNumDisplay = document.getElementById('randomNumber');

function genRandNum() {
    const minVal = parseInt(min.value);
    const maxVal = parseInt(max.value);

    if (isNaN(minVal) || isNaN(maxVal) || minVal >= maxVal) {
        alert("Please enter valid minimum and maximum values.");
        return;
    }

    const randNum = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    randNumDisplay.textContent = randNum;
}

function reset() {
    min.value = 1;
    max.value = 100;
    randNumDisplay.textContent = "Click the button to generate";
}

genBtn.addEventListener('click', genRandNum);
resetBtn.addEventListener('click', reset);