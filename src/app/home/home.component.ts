import { Component } from '@angular/core';
import { GreetingsComponent } from '../components/greetings/greetings.component';

@Component({
  selector: 'app-home',
  imports: [GreetingsComponent],
  template: `
    <p>
      home works!
    </p>
    <app-greetings [message]="'Hello World'" ></app-greetings>
  `,
  styles: ``
})
export class HomeComponent {

}
