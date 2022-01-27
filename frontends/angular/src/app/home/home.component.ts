import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  readonly METAMASK_KEY: string = 'metamask';

  public isIdentified: boolean = false;
  public isConnected: boolean = false;
  public ownerAddress: string = '';
  constructor() {}

  ngOnInit() {
    if (this.checkIfMetamaskInstalled()) {
      this.isIdentified = true;

      if (this.checkIfMetamaskConnected()) {
        this.connected();
      }
    }
  }
  private checkIfMetamaskInstalled(): boolean {
    if (typeof (window as any).ethereum !== 'undefined') {
      return true;
    }
    return false;
  }

  private checkIfMetamaskConnected(): boolean {
    if (localStorage.getItem(this.METAMASK_KEY)) {
      return true;
    }
    return false;
  }

  private storeMetamask() {
    localStorage.setItem(this.METAMASK_KEY, this.ownerAddress);
  }

  private connected() {
    this.isConnected = true;
  }

  public async connectMetamask() {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = accounts[0];
    this.ownerAddress = account;
    this.storeMetamask();
    this.connected();
  }
}
