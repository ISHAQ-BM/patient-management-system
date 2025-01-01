import { Component, input } from "@angular/core";
import { Input } from "@angular/core";
@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
})

export class InputComponent {

  @Input() label: string = '';
  @Input() placeholder: string = '';
}