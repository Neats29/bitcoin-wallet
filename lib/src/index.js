"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin = require("bitcoinjs-lib");
const pbkdf2 = require("pbkdf2");
const safe_buffer_1 = require("safe-buffer");
const english_word_list_1 = require("../english-word-list");
const entropy = '00000001100111111000010001100001101001111001110011101000010100010101111100100001010111101000101011010011011010110000100000100010';
const hash = bitcoin.crypto.sha256(entropy);
const hex = hash.toString('hex');
const bin = parseInt(hex, 16).toString(2);
const checkSum = bin.substr(0, 4);
const withCheckSum = entropy.toString() + checkSum.toString();
const sequence = (num, arr) => {
    if (num.length > 0) {
        arr.push(num.substr(0, 11));
        num = num.substr(11, num.length);
        sequence(num, arr);
        return arr;
    }
};
const generateSeq = () => sequence(withCheckSum, []);
const binaryToByte = bin => parseInt(bin, 2);
const getIndex = binaryToByte(generateSeq());
const mnemonicList = () => {
    const binaryList = generateSeq().map(a => binaryToByte(a));
    return binaryList.map(a => english_word_list_1.default[a]);
};
const mnemonicBuffer = new safe_buffer_1.Buffer(mnemonicList(), 'utf8');
const saltBuffer = new safe_buffer_1.Buffer('passphrase', 'utf8');
const numOfTimesToRun = 2048;
const seedBuffer = pbkdf2.pbkdf2Sync(mnemonicBuffer, saltBuffer, numOfTimesToRun, 64, 'sha512');
const seed = seedBuffer.toString(2);
console.log(seed);
const privateKey = seed.substr(0, 256);
//# sourceMappingURL=index.js.map