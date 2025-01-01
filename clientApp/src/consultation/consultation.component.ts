import { Component } from "@angular/core";
import { InputComponent } from "./components/input/input.component";
import { TextAreaComponent } from "./components/textarea/textarea.component";
import { ButtonComponent } from "./components/examsComp/button/button.component";

@Component({
  selector: 'consultation',
  templateUrl: './consultation.component.html',
  imports : [InputComponent , TextAreaComponent , ButtonComponent ]
})

export class ConsultationComponent {
  num = 0;
  plus() {
    this.num++;
  }
  minus() {
    (this.num> 0)&&this.num--;
  }
}