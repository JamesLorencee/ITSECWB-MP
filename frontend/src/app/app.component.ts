import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppModule } from './app.module';
@Component({
  // standalone: true,
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  // imports: [RouterModule]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
