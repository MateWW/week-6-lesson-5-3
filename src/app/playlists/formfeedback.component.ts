import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'formfeedback',
  template: `
    <div class="alert" 
      *ngIf="visible"
      [ngClass]="{'alert-danger':!complete,'alert-success':complete}"
      role="alert">
      <strong>{{title}}</strong> {{text}}
    </div>
  `,
  styles: []
})
export class FormfeedbackComponent implements OnInit {

  complete:boolean;
  visible:boolean=false;
  form;


  title = "Congratulation";
  text = "You complete the form correctly";

  constructor() { }

  @Input("ref")
  set getform(e){
    e.valueChanges.subscribe(()=> {
      if(!e.submitted)
        this.validate()
      else
        this.visible=false;
    });
    this.form=e.form.controls;
  }

  ErrorMessage={
    minlength: "Wpisany tekst ma zbyt mało znaków. ",
    maxlength: "Wpisany tekst przekracza liczbę dopuszczalnych znaków. ",
    required: "Zaznaczone pole jest wymagane. "
  }

  validate(){
    let text="";
    this.complete=true;
    for(let controln in this.form)
    { 
      let control = this.form[controln];
      if(!control.valid && !control.pristine)
      {
        this.complete=false;
        this.visible=true;

        for(let error in control.errors)
          text+=this.ErrorMessage[error];
      }
    }
    if(text==="")
    {
      this.title="Gratulacje"
      this.text="Formularz jest poprawnie wypełniony";
    }
    else 
    {
      this.title="Błąd";
      this.text=text;
    }

  }

  ngOnInit(){
  }

}
