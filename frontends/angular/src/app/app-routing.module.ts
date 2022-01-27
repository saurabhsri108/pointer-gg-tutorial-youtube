import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNftComponent } from './create-nft/create-nft.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create-nft',
    component: CreateNftComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
