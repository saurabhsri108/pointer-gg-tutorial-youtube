import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Keyboard from './components/Keyboard';

const API_URL = 'http://localhost:5000';

export default function Home() {
  const [isEthereum, setIsEthereum] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [keyboardNFTs, setKeyboardNFTs] = useState([]);

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

  useEffect(() => {
    getKeyboardNFTs();
  }, []);

  async function getKeyboardNFTs() {
    const { data } = await axios.get(`${API_URL}/nft`);
    if (data.success) {
      setKeyboardNFTs(data.data);
    }
  }

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

  if (!isEthereum) {
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

  if (isEthereum && !isConnected) {
    return (
      <main className="home">
        <h1 className="heading">Keyboard NFT Minter</h1>
        <button className="btn btn-black" onClick={connectMetamask}>
          Connect with Metamask
        </button>
      </main>
    );
  }

  if (isEthereum && isConnected) {
    return (
      <main className="home">
        <h1 className="heading">Keyboard NFT Minter</h1>
        <Link href="create-nft">
          <button className="btn btn-black btn-link">Create new NFT</button>
        </Link>
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
