require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URI,
  () => {
    console.log('MongoDB Connected Successfully');
  },
  (err) => {
    console.error(err.message);
  }
);

const nftSchema = new mongoose.Schema(
  {
    keyboardKind: { type: String, required: true },
    keyboardType: { type: String, required: true },
    keyboardFilter: { type: String, required: true },
    ownerAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const NFT = mongoose.model('NFT', nftSchema);

async function create(nft) {
  try {
    const data = await NFT.create(nft);
    return { data };
  } catch (err) {
    console.error('Error adding NFT document: ', err.message);
    return 'Error: NFT Creation Failed!';
  }
}

async function read() {
  try {
    const data = await NFT.find({});
    console.log('NFTs:::', data);
    return data;
  } catch (err) {
    console.log(err);
    return 'Error: Something went wrong in fetching the NFTs!';
  }
}

module.exports.create = create;
module.exports.read = read;
