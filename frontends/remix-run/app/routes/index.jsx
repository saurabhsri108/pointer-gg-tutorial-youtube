import { useEffect, useState } from 'react';
import { useLoaderData } from 'remix';
import axios from 'axios';
import Keyboard from '~/components/Keyboard';

const API_URL = 'http://localhost:5000';

export async function loader() {
  const { data } = await axios.get(`${API_URL}/nft`);
  if (data.success) {
    return data.data;
  }
  return [];
}

export default function Index() {
  const [mounted, setMounted] = useState(false);
  const [isEthereum, setIsEthereum] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const keyboardNFTs = useLoaderData();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      setIsEthereum(true);
      if (localStorage.getItem('metamask')) {
        setIsConnected(true);
      }
    }
  }, []);

  async function connectMetamask() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = accounts[0];
    if (typeof account === 'string') {
      localStorage.setItem('metamask', account);
      setIsConnected(true);
    }
  }

  if (mounted && !isEthereum) {
    return (
      <main className="home">
        <h1 className="heading">Keyboard NFT Minter</h1>
        <a
          href="https://metamask.io"
          className="btn btn-black btn-link"
          target="_blank"
          rel="noreferrer"
        >
          Please install metamask wallet to use this app
        </a>
      </main>
    );
  }

  if (mounted && isEthereum && !isConnected) {
    return (
      <main className="home">
        <h1 className="heading">Keyboard NFT Minter</h1>
        <button className="btn btn-black" onClick={connectMetamask}>
          Connect with Metamask
        </button>
      </main>
    );
  }

  if (mounted && isEthereum && isConnected) {
    return (
      <main className="home">
        <h1 className="heading">Keyboard NFT Minter</h1>
        <a className="btn btn-black btn-link" href="/create-nft">
          Create new NFT
        </a>
        <section className="nfts">
          {keyboardNFTs.map((keyboard) => {
            return (
              <Keyboard key={keyboard.id} keyboard={keyboard} preview={false} />
            );
          })}
        </section>
      </main>
    );
  }

  return null;
}
