import { useEffect, useState } from 'react';

export default function Keyboard({ keyboard, preview }) {
  const [alt, setAlt] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [style, setStyle] = useState('');
  const [connectedAccount, setConnectedAccount] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    displayImage();
  }, [keyboard]);

  useEffect(() => {
    if (localStorage.getItem('metamask')) {
      setConnectedAccount(localStorage.getItem('metamask'));

      if (connectedAccount === keyboard.ownerAddress) {
        setIsOwner(true);
      }
    }
  }, [connectedAccount, keyboard.ownerAddress]);

  function getKindDir(kind) {
    return {
      0: 'sixty-percent',
      1: 'seventy-five-percent',
      2: 'eighty-percent',
      3: 'iso-105',
    }[kind];
  }

  function displayImage() {
    const kindDir = getKindDir(keyboard.keyboardKind);
    const filename = keyboard.keyboardType.toUpperCase();
    setImagePath(`assets/keyboards/${kindDir}/${filename}.png`);
    setAlt(
      `${kindDir} keyboard with ${filename} keys ${
        keyboard.keyboardFilter
          ? `with
${keyboard.keyboardFilter}`
          : ''
      }`
    );
    setStyle(keyboard.keyboardFilter);
  }

  return (
    <div className="nft">
      {preview && <h2>Preview</h2>}
      <div className="borders">
        <img
          height={230}
          width={360}
          className={style}
          src={imagePath}
          alt={alt}
        />
      </div>
      {!preview && !isOwner && <button className="btn btn-tip">Tip</button>}
      {!preview && isOwner && (
        <button className="btn btn-no-tip">You own it!</button>
      )}
    </div>
  );
}
