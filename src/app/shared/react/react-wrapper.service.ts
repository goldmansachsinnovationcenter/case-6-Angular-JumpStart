import { Injectable, ElementRef, OnDestroy } from '@angular/core';
import { Root, createRoot } from 'react-dom/client';

@Injectable({
  providedIn: 'root'
})
export class ReactWrapperService implements OnDestroy {
  private roots = new Map<ElementRef, Root>();

  constructor() {}

  renderReact(elementRef: ElementRef, reactElement: React.ReactElement, callback?: () => void): void {
    if (!elementRef || !reactElement) {
      return;
    }

    this.unmountReact(elementRef);

    const container = elementRef.nativeElement;
    const root = createRoot(container);
    this.roots.set(elementRef, root);

    root.render(reactElement);

    if (callback) {
      callback();
    }
  }

  unmountReact(elementRef: ElementRef): void {
    if (!elementRef) {
      return;
    }

    const root = this.roots.get(elementRef);
    if (root) {
      root.unmount();
      this.roots.delete(elementRef);
    }
  }

  ngOnDestroy(): void {
    this.roots.forEach(root => {
      root.unmount();
    });
    this.roots.clear();
  }
}
