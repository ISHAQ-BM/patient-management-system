import { Component , Input } from "@angular/core";


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})

export class ButtonComponent {
    @Input() ButtonName : string = '';

    isToggled: boolean = true;

    toggle() {
      this.isToggled = !this.isToggled;
    }

    
}