import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'gc-cl-infinite-scroll-wrapper',
  templateUrl: './infinite-scroll-wrapper.component.html',
  styleUrls: ['./infinite-scroll-wrapper.component.scss'],
})
export class GCCLInfiniteScrollWrapperComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;
  @Input() isShowMoreOptionVisible = false;
  @Input() options = {};
  @Output() scrollToEnd = new EventEmitter<any>();
  @Output() showMoreClicked = new EventEmitter<any>();

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options = {
      root: this.isHostScrollable() ? this.element : null,
      threshold: 0,
      ...this.options,
    };
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && this.isScrollbarVisible()) {
        this.scrollToEnd.emit();
      }
    }, options);
    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  get element(): any {
    return this.host.nativeElement;
  }

  public onShowMoreClicked(): void {
    this.showMoreClicked.emit();
  }

  private isHostScrollable(): boolean {
    const style = window.getComputedStyle(this.element);
    return (
      style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll'
    );
  }

  private isScrollbarVisible(): boolean {
    return this.isHostScrollable()
      ? this.element.scrollHeight > this.element.clientHeight
      : true;
  }
}
