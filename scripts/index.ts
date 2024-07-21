import { concat, ethers, hashMessage, keccak256, toUtf8Bytes, Wallet, SigningKey } from "ethers";


let privateKey = '0x90b12d9b37e07a7413b343f094792b948b4733391b9b12a14247ca16ca5d97d1' 

const wallet = new Wallet(privateKey);

const message = '0x1234'


console.log(wallet.signMessageSync(message));

const hash = hashMessage(message);

console.log(toUtf8Bytes(message));
console.log(hashMessage(toUtf8Bytes(message)));
console.log(hashMessage(message));

/**
 * 去掉0x 拼接字符串.
 */

console.log('concat:', concat([
    hashMessage(message),
    hashMessage(message)
]))

/**
 * hashMessage的组成.
 * 消息头部: "0x19 Ethereum Signed Message:\n"
 * message的长度
 * message
 */

const messagePrefix = '0x19 Ethereum Signed Message:\n';
const concatMessage = concat([
    toUtf8Bytes(messagePrefix),
    toUtf8Bytes(String(message.length)),
    toUtf8Bytes(message)
])

console.log('消息hash: ', concatMessage);


/**
 * 转成256
 */

console.log('转成256', keccak256(concatMessage));
privateKey = "90b12d9b37e07a7413b343f094792b948b4733391b9b12a14247ca16ca5d97d1"


const signingKey = new SigningKey(privateKey);
const digest = hashMessage(message);
const signature = signingKey.sign(digest);
console.log('signature:', signature)