let display = document.getElementById("display");

display.addEventListener("keydown", function(event) {
    if(event.key === 'Enter') display.value = evaluate(display.value);
    if(event.key === '+' || event.key === '-' || event.key === 'Backspace') return;
    if(event.key === '*') display.value += '×';
    if(event.key === '/') display.value += '÷';
    if (isNaN(event.key)) event.preventDefault();
});

Array.from(document.getElementsByClassName("buttons")).forEach(element => {
    element.addEventListener("click", () => {
        const lastChar = display.value.charAt(display.value.length - 1);
        const operators = "+-×÷";
        const currentChar = element.innerHTML;
        if(currentChar === '=') return;
        if (operators.includes(lastChar) && operators.includes(currentChar)) return;
        display.value += currentChar;
    });
});

function evaluate(str) {
    str = str.replace(/\s+/g, '');

    str = str.replace(/(\d+)(×)(\d+)/g, (match, p1, operator, p2) => parseInt(p1) * parseInt(p2));
    str = str.replace(/(\d+)(÷)(\d+)/g, (match, p1, operator, p2) => parseInt(p1) / parseInt(p2));

    str = str.replace(/(\d+)(\+)(\d+)/g, (match, p1, operator, p2) => parseInt(p1) + parseInt(p2));
    str = str.replace(/(\d+)(-)(\d+)/g, (match, p1, operator, p2) => parseInt(p1) - parseInt(p2));

    return parseInt(str);
}


document.getElementById("equals").onclick = () => {
    display.value = evaluate(display.value); 
};

document.getElementById("clear").onclick = ()=>{
    display.value = "";
};