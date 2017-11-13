export const numToCash = (num, shortHand = false) => {
  if (typeof num !== 'number')
    return NaN;
  const isNeg = num < 0;
  num = Math.abs(num).toFixed(2);
  let numArr = String(num).split('.');
  const dollars = numArr[0];
  const cents = numArr[1];
  let cash = '';
  for ( let i = 0; i < dollars.length; i++ ) {
    if (i !== 0 && i % 3 === 0) {
      cash = ',' + cash;
    }
    cash = dollars[dollars.length - 1 - i] + cash;
  }
  if (shortHand) {
    cash = cashToShortHand(cash);
  } else {
    cash += `.${cents}`;
  }
  if ( isNeg )
    return `$(${cash})`;
  return '$' + cash;
}

const cashToShortHand = (str) => {
  let val = Number(str.replace(/\D/g, ''));
  console.log(val);
  str = str.replace(/,.*/, '');
  if (val > 999999) 
    str += 'M'
  else if (val > 999)
    str += 'K'
  return str;
}

export const cashToNum = str => {
  return Number(str.replace(/[^.\d]/g, ''));
}