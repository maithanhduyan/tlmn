const crypto = require('crypto');
const randomUtil = require('../../modules/utils/randomUtil');

function generateRandomString(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomStr = '';
  
  // Tạo buffer chứa các số ngẫu nhiên
  const buffer = crypto.randomBytes(length);

  // Chuyển đổi buffer thành chuỗi ký tự
  for (let i = 0; i < buffer.length; i++) {
    const index = buffer[i] % chars.length;
    randomStr += chars.charAt(index);
  }

  return randomStr;
}

const randomString = generateRandomString(128);
console.log(randomString);
console.log(new randomUtil(10).generate());
console.log(new randomUtil(10).generate());