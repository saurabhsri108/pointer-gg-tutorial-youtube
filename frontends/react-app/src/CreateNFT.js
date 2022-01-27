import { useEffect, useState } from 'react';
import axios from 'axios';
import Keyboard from './components/Keyboard';

const API_URL = 'http://localhost:5000';

export function CreateNFT() {
  const [keyboard, setKeyboard] = useState({
    keyboardKind: 0,
    keyboardType: 'pbt',
    keyboardFilter: 'none',
    ownerAddress: '',
  });

  useEffect(() => {
    setKeyboard({
      ...keyboard,
      ownerAddress: localStorage.getItem('metamask'),
    });
  }, []);

  function change(event) {
    setKeyboard({ ...keyboard, [event.target.name]: event.target.value });
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nft = {
      kind: keyboard.keyboardKind,
      type: keyboard.keyboardType,
      filter: keyboard.keyboardFilter,
      owner: keyboard.ownerAddress,
    };
    console.log(nft);
    const { data } = await axios.post(`${API_URL}/nft`, nft);
    if (data.success) {
      notify(data.message);
      window.location.href = '/';
    }
  }

  function notify(message) {
    alert(message);
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="kind">Keyboard Kind</label>
          <select
            id="kind"
            name="keyboardKind"
            onChange={change}
            defaultValue={keyboard.keyboardKind}
          >
            <option value="0">60%</option>
            <option value="1">75%</option>
            <option value="2">80%</option>
            <option value="3">ISO-105</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Keyboard Type</label>
          <select
            id="type"
            name="keyboardType"
            onChange={change}
            defaultValue={keyboard.keyboardType}
          >
            <option value="abs">ABS</option>
            <option value="pbt">PBT</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filter">Keyboard Filter</label>
          <select
            id="filter"
            name="keyboardFilter"
            onChange={change}
            defaultValue={keyboard.keyboardFilter}
          >
            <option value="none">None</option>
            <option value="sepia">Sepia</option>
            <option value="grayscale">Grayscale</option>
            <option value="invert">Invert</option>
            <option value="hue-rotate-90">Hue Rotate (90°)</option>
            <option value="hue-rotate-180">Hue Rotate (180°)</option>
          </select>
        </div>
        <button type="submit" className="btn btn-black">
          Mint NFT
        </button>
      </form>

      <section className="preview">
        <Keyboard preview={true} keyboard={keyboard} />
      </section>
    </>
  );
}
