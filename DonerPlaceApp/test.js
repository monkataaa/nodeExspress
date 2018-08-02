
let input = ' asdasd asdkj , , d, ,a sd '
let inputtedToppings = input.split(/,| /).filter(a => a != '')
// .split('/\s/g')
console.log(inputtedToppings);