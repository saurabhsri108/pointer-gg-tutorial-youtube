import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  public owner: string = <string>localStorage.getItem('metamask');

  constructor(
    private _fb: FormBuilder,
    private _httpClient: HttpClient,
    private _router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  private initializeForm() {
    this.form = this._fb.group({
      keyboardKind: ['0', Validators.required],
      keyboardType: ['abs', Validators.required],
      keyboardFilter: ['none', Validators.required],
      ownerAddress: [this.owner, Validators.required],
    });
  }

  onSubmit() {
    const nftObj = {
      kind: this.form.get('keyboardKind').value,
      type: this.form.get('keyboardType').value,
      filter: this.form.get('keyboardFilter').value,
      owner: this.form.get('ownerAddress').value,
    };
    this._httpClient.post(`${API_URL}/nft`, nftObj).subscribe(
      (result: any) => {
        console.log('Result:::', result);
        if (result.success) {
          this._router.navigate(['']);
        }
      },
      (error: any) => {
        console.error('Error in Creation:::', error.error);
        if (!error.error.success) {
          alert(error.error.message);
        }
      }
    );
  }
}
