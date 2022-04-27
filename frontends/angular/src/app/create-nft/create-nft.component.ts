import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import contract from '../Keyboard.json';
import { ethers } from 'ethers';

const API_URL = 'http://localhost:5000';

@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.css'],
})
export class CreateNftComponent implements OnInit {
  public form: FormGroup | any;
  public success: boolean = false;
  public error: boolean = false;
  public ethereum: any;

  // public owner: string = <string>localStorage.getItem('metamask');
  readonly CONTRACT_ADDRESS: string =
    '0xD76780E312cAb4202E9F8E66a04e76CBea886D07';
  public contractABI = contract.abi;
  public nfts: any = [];

  constructor(
    private _fb: FormBuilder,
    private _httpClient: HttpClient,
    private _router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.checkIfMetamaskInstalled();
  }

  private initializeForm() {
    this.form = this._fb.group({
      keyboardKind: ['0', Validators.required],
      keyboardType: ['abs', Validators.required],
      keyboardFilter: ['none', Validators.required],
      // ownerAddress: [this.owner, Validators.required],
    });
  }

  private checkIfMetamaskInstalled(): boolean {
    if (typeof (window as any).ethereum !== 'undefined') {
      this.ethereum = (window as any).ethereum;
      return true;
    }
    return false;
  }

  async onSubmit() {
    // const nftObj = {
    //   kind: this.form.get('keyboardKind').value,
    //   type: this.form.get('keyboardType').value,
    //   filter: this.form.get('keyboardFilter').value,
    //   // owner: this.form.get('ownerAddress').value,
    // };
    const kind: string = this.form.get('keyboardKind').value;
    const isPbt: boolean =
      this.form.get('keyboardType').value === 'pbt' ? true : false;
    const filter: string = this.form.get('keyboardFilter').value;
    if (!this.ethereum) {
      console.error('Ethereum object is required to create a keyboard');
      return;
    }

    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();
    const keyboardsContract = new ethers.Contract(
      this.CONTRACT_ADDRESS,
      this.contractABI,
      signer
    );

    try {
      console.log({ kind, isPbt, filter });
      const createTxn = await keyboardsContract['create'](kind, isPbt, filter);
      console.log('Create transaction started...', createTxn.hash);

      await createTxn.wait();
      console.log('Created keyboard!', createTxn.hash);

      this._router.navigate(['']);
    } catch (err: any) {
      console.error(err.message);
    }
    // this._httpClient.post(`${API_URL}/nft`, nftObj).subscribe(
    //   (result: any) => {
    //     console.log('Result:::', result);
    //     if (result.success) {
    //       this._router.navigate(['']);
    //     }
    //   },
    //   (error: any) => {
    //     console.error('Error in Creation:::', error.error);
    //     if (!error.error.success) {
    //       alert(error.error.message);
    //     }
    //   }
    // );
  }
}
