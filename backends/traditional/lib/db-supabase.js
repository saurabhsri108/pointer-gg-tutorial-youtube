require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const options = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON,
  options
);

async function create(nft) {
  try {
    const { data, error } = await supabase.from('nfts').insert(nft);
    if (!error) {
      return { data: data[0] };
    }
    throw error;
  } catch (err) {
    console.error('Error adding NFT document: ', err.message);
    return 'Error: NFT Creation Failed!';
  }
}

async function read() {
  try {
    const { data, error } = await supabase.from('nfts').select();
    if (!error) {
      console.log('NFTs:::', data);
      return data;
    }
    throw error;
  } catch (err) {
    console.log(err.message);
    return 'Error: Something went wrong in fetching the NFTs!';
  }
}

module.exports.create = create;
module.exports.read = read;
