import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNftComponent } from './create-nft/create-nft.component';
import { ShowNftsComponent } from './show-nfts/show-nfts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardPipe } from './keyboard/keyboard.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [AppComponent, CreateNftComponent, ShowNftsComponent, HomeComponent, KeyboardComponent, KeyboardPipe],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, CommonModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
