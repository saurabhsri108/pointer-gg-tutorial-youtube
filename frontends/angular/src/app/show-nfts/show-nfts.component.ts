import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000';

@Component({
  selector: 'app-show-nfts',
  templateUrl: './show-nfts.component.html',
})
export class ShowNftsComponent implements OnInit {
  readonly METAMASK_KEY: string = 'metamask';
  public nfts$: Observable<any>;

  constructor(private _httpClient: HttpClient) {
    this.nfts$ = this.fetchNFTs();
  }

  ngOnInit(): void {
    const owner = <string>localStorage.getItem(this.METAMASK_KEY);
  }

  private fetchNFTs(): any {
    return this._httpClient.get(`${API_URL}/nft`);
  }
}
