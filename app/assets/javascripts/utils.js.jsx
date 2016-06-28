function amountFormat(amount){
  if(amount<0){
    return '($'+Math.abs(Number(amount)).toLocaleString()+')'
  } else {
    return '$'+Number(amount).toLocaleString()
  }
}