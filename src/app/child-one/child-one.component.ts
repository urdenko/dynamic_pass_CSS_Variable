import { Component } from '@angular/core';

@Component({
  selector: 'app-child-one',
  template: `
    <div>Factorial from 150 = {{ factorial(150) }}</div>
    <div>Factorial from 151 = {{ factorial(151) }}</div>
    <div>Factorial from 152 = {{ factorial(152) }}</div>
    <div>Factorial from 153 = {{ factorial(153) }}</div>
    <div>Factorial from 154 = {{ factorial(154) }}</div>
  `
})
export class ChildOneComponent {
  public factorial(n: number): string {
    var f =
      'var o = {' +
      "q: '\\''," +
      "b: '\\\\'," +
      'r: 1,' +
      'n: $,' +
      "s: 'var o = {q: _q_b_q_q, b:_q_b_b_q, r: _r, n:_n, s: _q_s_q}; o.r *= o.n--; " +
      "o.n ? Object.keys(o).reduce(function(a, k){return a.split(_q__q + k).join(o[k])}, o.s) : o.r;'" +
      '};' +
      'o.r *= o.n--;' +
      "o.n ? Object.keys(o).reduce(function(a, k){return a.split('_' + k).join(o[k])}, o.s) : o.r;";
    f = f.replace('$', n.toString());

    for (var i = 0; i < n; i++) {
      if (parseInt(f)) {
        throw new Error('Cheaters are not allowed.');
      }
      f = eval(f);
    }
    return f;
  }
}
