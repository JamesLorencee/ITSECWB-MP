import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { ModalComponent } from './modal/modal.component';
import { TitleIconComponent } from './title-icon/title-icon.component';

@NgModule({
  declarations: [NavBarComponent,  ModalComponent, TitleIconComponent],
  imports: [CommonModule, NgIconsModule],
  exports: [NavBarComponent, ModalComponent, TitleIconComponent],
})
export class SharedModule {}
