import { Component, input } from '@angular/core';

@Component({
  selector: 'app-greetings',
  imports: [],
  template: `
    <p>
      {{message()}}
    </p>
    <input type="text"  (keyup)="keyuphandler($event)" >
  `,
  styles: ``
})
export class GreetingsComponent {
  message = input('Hello, World!');
  keyuphandler(event: KeyboardEvent) {
    console.log(`Key pressed: ${event.key}`);
  }
}
