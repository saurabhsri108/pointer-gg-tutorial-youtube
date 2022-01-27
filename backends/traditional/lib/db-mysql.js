require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);

async function connectMySQL() {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected Successfully');
  } catch (error) {
    console.error('Unable to connect to the mysql database:', error);
  }
}

connectMySQL();

const nftSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  keyboardKind: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  keyboardType: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
  keyboardFilter: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  ownerAddress: {
    type: DataTypes.STRING(42),
    allowNull: false,
  },
};

const options = { timestamps: true };

const NFT = sequelize.define('nfts', nftSchema, options);

async function createTables() {
  try {
    const result = await sequelize.sync();
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
}

createTables();

async function create(nft) {
  try {
    const data = await NFT.create(nft);
    console.log(data);
    return { data };
  } catch (err) {
    console.error('Error adding NFT document: ', err.message);
    return 'Error: NFT Creation Failed!';
  }
}

async function read() {
  try {
    const data = await NFT.findAll({ raw: true });
    console.log('NFTs:::', data);
    return data;
  } catch (err) {
    console.log(err);
    return 'Error: Something went wrong in fetching the NFTs!';
  }
}

module.exports.create = create;
module.exports.read = read;
