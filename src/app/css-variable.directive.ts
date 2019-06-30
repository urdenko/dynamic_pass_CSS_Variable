import { Directive, Input, NgZone, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Directive to pass a css variable to host element
 */
@Directive({
  selector: '[cssVariable]'
})
export class CssVariableDirective implements OnDestroy {
  private unsubscriber$ = new Subject();

  constructor(private hostElement: ElementRef, private ngZone: NgZone) {}

  @Input()
  private set cssVariable(variables: { [key: string]: string | number | Observable<string | number> }) {
    Object.keys(variables).forEach(variableName => {
      const variableValue = variables[variableName];

      if (variableValue instanceof Observable) {
        this.subscribeToStreamVariable(variableName, variableValue);
        return;
      }

      this.applyVariable(variableName, variableValue);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  private subscribeToStreamVariable(variableName: string, variableValues: Observable<string | number>): void {
    this.ngZone.runOutsideAngular(() => {
      variableValues.pipe(takeUntil(this.unsubscriber$)).subscribe(variableValue => {
        this.hostElement.nativeElement.style.setProperty(`--${variableName}`, variableValue);
      });
    });
  }

  private applyVariable(variableName: string, variableValue: string | number): void {
    this.hostElement.nativeElement.style.setProperty(`--${variableName}`, variableValue);
  }
}
