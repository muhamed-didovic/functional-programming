//Refactor imperative code to a single composed expression using Box

const Box = x =>
  ({
    map: f => Box(f(x)),
    fold: f => f(x),
    toString: () => `Box(${x})`
  })

const moneyToFloat = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => {
      console.log(111, r, parseFloat(r));
      return parseFloat(r)
    })

const percentToFloat = str =>
  Box(str.replace(/\%/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(number => {
      console.log('2222', number, number * 0.01, parseFloat('44%'));
      return number * 0.01
    })

const applyDiscount = (price, discount) =>
  moneyToFloat(price)
    .fold(cost =>
      percentToFloat(discount)
        .fold(savings =>
        cost - cost * savings))

const result = applyDiscount('$5.00', '20%')
console.log(result)
