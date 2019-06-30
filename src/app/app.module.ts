import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CssVariableDirective } from './css-variable.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ChildOneComponent } from './child-one/child-one.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, CssVariableDirective, ChildOneComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
