let input = document.getElementById("input_number");
let input_min = input.min;
let input_max = input.max;

const increase_script = function(){
    if(input.value<input_max)
        input.value++;
}
const decrease_script = function(){
    if(input.value>input_min)
        input.value--;
}

let decrease = document.getElementById("input_number_decrease");
let increase = document.getElementById("input_number_increase");
decrease.addEventListener("click", decrease_script ,false);
increase.addEventListener("click", increase_script ,false);