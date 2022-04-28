import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import contract from '../Keyboard.json';
import { ethers } from 'ethers';

@Component({
  selector: 'app-show-nfts',
  templateUrl: './show-nfts.component.html',
})
export class ShowNftsComponent implements OnInit {
  @Input() ethereum: any;
  @Input() currentOwner: string = '';
  // readonly METAMASK_KEY: string = 'metamask';
  readonly CONTRACT_ADDRESS: string =
    '0xD76780E312cAb4202E9F8E66a04e76CBea886D07';
  public contractABI = contract.abi;
  public nfts: any = [];

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchNFTs();
  }

  private async fetchNFTs(): Promise<any> {
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();
    const keyboardsContract = new ethers.Contract(
      this.CONTRACT_ADDRESS,
      this.contractABI,
      signer
    );

    const keyboards = await keyboardsContract['getKeyboards']();
    console.log('Retrieved keyboards...', keyboards);
    this.nfts = keyboards;
  }
}
