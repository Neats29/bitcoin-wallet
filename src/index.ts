import * as bitcoin from 'bitcoinjs-lib'
import * as pbkdf2 from 'pbkdf2'
import { Buffer } from 'safe-buffer'
import wordList from '../english-word-list'

//128 bit random number
const entropy =
  '00000001100111111000010001100001101001111001110011101000010100010101111100100001010111101000101011010011011010110000100000100010'

// const randomOctal = parseInt(entropy, 2).toString(8)
const hash = bitcoin.crypto.sha256(entropy)

const hex = hash.toString('hex')

const bin = parseInt(hex, 16).toString(2)

const checkSum = bin.substr(0, 4)

const withCheckSum = entropy.toString() + checkSum.toString()

const sequence = (num, arr) => {
  if (num.length > 0) {
    arr.push(num.substr(0, 11))
    num = num.substr(11, num.length)
    sequence(num, arr)
    return arr
  }
}

const generateSeq = () => sequence(withCheckSum, [])

const binaryToByte = bin => parseInt(bin, 2)
const getIndex: number = binaryToByte(generateSeq())

const mnemonicList = () => {
  const binaryList = generateSeq().map(a => binaryToByte(a))
  return binaryList.map(a => wordList[a])
}

const mnemonicBuffer = new Buffer(mnemonicList(), 'utf8')
const saltBuffer = new Buffer('passphrase', 'utf8')

const numOfTimesToRun = 2048 //BIP39 standard
const seedBuffer = pbkdf2.pbkdf2Sync(
  mnemonicBuffer,
  saltBuffer,
  numOfTimesToRun,
  64,
  'sha512'
)

//======================================================================
//TODO: convert to binary instead of hex so its 512 characters long
const seed = seedBuffer.toString('hex')
console.log(seed)
// const privateKey = seed.substr(0, 256)
// const chainKey = seed.substr(256, 256)
