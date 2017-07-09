"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin = require("bitcoinjs-lib");
const entropy = '00000001100111111000010001100001101001111001110011101000010100010101111100100001010111101000101011010011011010110000100000100010';
const hash = bitcoin.crypto.sha256(entropy);
const hex = hash.toString('hex');
const bin = parseInt(hex, 16).toString(2);
const checkSum = bin.substr(0, 4);
const withCheckSum = `000000011001111110000100011000011010011110011100111010000101000101011111001000010101111010001010110100110110101100001000001000101011`;
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
console.log(sequence(withCheckSum, []));
console.log(getIndex);
//# sourceMappingURL=index.js.map