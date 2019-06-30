import { Component, DoCheck, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { range, of, Subject } from 'rxjs';
import { delay, concatMap, switchMap, tap, takeUntil, startWith, filter, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  /**
   * Direct work with host element for better performance
   */
  @ViewChild('performanceProgressBar', { static: false }) performanceProgressBar!: ElementRef;

  public currentPercent = 0;

  private getBack$ = new Subject<number>();

  public fastModeControl = new FormControl(false);

  public hurtControl = new FormControl(false);

  /**
   * The mock source of progress percent.
   * Added a tenth of a percent for additional calculations
   */
  public percentProgressBar$ = this.getBack$.asObservable().pipe(
    startWith(0),
    map(from => from * 10),
    switchMap(from => range(from, 1000 - from).pipe(concatMap(val => of(val / 10).pipe(delay(100))))),
    tap(currentPercent => (this.currentPercent = Number(currentPercent)))
  );

  public percentString$ = this.percentProgressBar$.pipe(map(percent => `"${percent.toFixed(1)}%"`));

  constructor(private ngZone: NgZone) {}

  /**
   * We look at the performance.
   * The lower the emission, the better
   */
  ngDoCheck(): void {
    console.log('Change detected!');
  }

  /** Drops progress by 20 steps */
  public getBack(): void {
    const backTo = this.currentPercent - 20 > 0 ? this.currentPercent - 20 : 0;

    if (!this.fastModeControl.value) {
      this.getBack$.next(backTo);
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.getBack$.next(backTo);
    });
  }
}
