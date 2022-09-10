export const generateCode = (num: number) => {
    const maxLength = num;
    const numbers = "0123456789";
    let code = ""
    for(let x = 0; x < maxLength; x++){
       code+= numbers.charAt(Math.random()*numbers.length)
    }
  return code;
}