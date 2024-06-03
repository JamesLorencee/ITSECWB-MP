import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  template: `<app-register></app-register>`,
  standalone: true,
  imports: [RegisterComponent]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
