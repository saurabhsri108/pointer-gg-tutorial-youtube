const log = require('../utils/log.js');
const DB = require('./db.js');

async function createNFT(kind, type, filter, owner) {
  const entryObject = {
    ownerAddress: owner,
    keyboardKind: kind,
    keyboardType: type,
    keyboardFilter: filter,
  };
  try {
    const data = await DB.create(entryObject);
    log(data, __filename);
    return data;
  } catch (err) {
    log(err, __filename);
    return err;
  }
}

async function readNFT() {
  try {
    const data = await DB.read();
    log(JSON.stringify(data), __filename);
    return data;
  } catch (err) {
    log(err, __filename);
    return err;
  }
}

module.exports = { createNFT, readNFT };
