import { Directive, Input, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
/**
 * Directive to pass a css variable to host element
 */
@Directive({
  selector: '[cssVariable]'
})
export class CssVariableDirective {
  constructor(private sanitizer: DomSanitizer) {}

  @Input()
  private set cssVariable(variables: { [key: string]: string | number }) {
    const styles = Object.keys(variables).reduce(
      (totalStyle, variableName) => {
        if (variables[variableName] === undefined || variables[variableName] === null) {
          return totalStyle;
        }

        return [...totalStyle, `--${variableName}: ${variables[variableName]}`];
      },
      <string[]>[]
    );

    this.cssVar = this.sanitizer.bypassSecurityTrustStyle(styles.join(';'));
  }

  @HostBinding('attr.style')
  private cssVar?: SafeStyle;
}
