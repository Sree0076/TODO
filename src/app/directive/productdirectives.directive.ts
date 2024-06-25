import { Directive, ElementRef, HostListener, } from '@angular/core';

@Directive({
  selector: '[appProductdirectives]',
  standalone: true
})
export class ProductdirectivesDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseover') onMouseEnter() {
  this.el.nativeElement.classList.add('hover');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.classList.remove('hover')
  }
}
