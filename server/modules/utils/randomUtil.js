const crypto = require('crypto');

module.exports = class RandomUtil{
    constructor(length) {
        this.length = length;
      }
    
      generate() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
    
        const buffer = crypto.randomBytes(this.length);
        for (let i = 0; i < buffer.length; i++) {
          const index = buffer[i] % chars.length;
          code += chars.charAt(index);
        }
    
        return code;
      }
}