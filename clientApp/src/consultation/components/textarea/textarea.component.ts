import { Component } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: 'textarea-component',
  templateUrl: './textarea.component.html',
})

export class TextAreaComponent {

  @Input() label: string = '';
}