var SHA256 = require('crypto-js/sha256');

class Block {

 constructor(index, timestamp, data, previousHash) {
   this.index = index;
   this.timestamp = timestamp;
   this.previousHash = previousHash;
   this.data = data;
   this.hash = this.calculateHash();
 } 

 calculateHash() {
   return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
 }

}

class Blockchain {

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/19/2018', 'genesis block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length -1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i -1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.calculateHash()) {
        return false;
      }
    }
    return true;
  }
}