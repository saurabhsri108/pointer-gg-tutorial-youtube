require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createNFT, readNFT } = require('./lib/nft');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/nft', async (req, res) => {
  try {
    const nfts = await readNFT();
    if (!Array.isArray(nfts)) {
      throw Error(nfts);
    }
    res.status(200).json({
      success: true,
      data: nfts,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
});

app.post('/nft', async (req, res) => {
  const { kind, type, filter, owner } = req.body;
  console.log(req.body);
  try {
    const createdNFT = await createNFT(kind, type, filter, owner);
    console.log('Created NFT:::', createdNFT);
    if (Object.keys(createdNFT).length > 0 && createdNFT.data) {
      return res.status(201).json({
        success: true,
        message: 'NFT creation successfully!',
        data: createdNFT.data,
      });
    }
    throw Error(createdNFT);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
