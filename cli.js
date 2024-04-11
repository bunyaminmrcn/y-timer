const { encrypt, decrypt } = require('./client/src/security');

const key = 's3cREt4_';

const ecTxt = encrypt('hello', key)

console.log({ ecTxt })


const dcTxt = decrypt(ecTxt, key)
console.log({ dcTxt })