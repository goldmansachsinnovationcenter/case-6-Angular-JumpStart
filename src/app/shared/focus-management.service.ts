import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FocusManagementService {
  private isKeyboardNavigation = false;
  private lastInteractionWasKeyboard = false;

  constructor() {
    this.initializeFocusManagement();
  }

  private initializeFocusManagement() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        this.isKeyboardNavigation = true;
        this.lastInteractionWasKeyboard = true;
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      this.isKeyboardNavigation = false;
      this.lastInteractionWasKeyboard = false;
      document.body.classList.remove('keyboard-navigation');
    });

    document.addEventListener('focusin', (event) => {
      if (this.isKeyboardNavigation && event.target instanceof HTMLElement) {
        event.target.classList.add('keyboard-focused');
      }
    });

    document.addEventListener('focusout', (event) => {
      if (event.target instanceof HTMLElement) {
        event.target.classList.remove('keyboard-focused');
      }
    });
  }

  isUsingKeyboard(): boolean {
    return this.lastInteractionWasKeyboard;
  }

  focusElement(element: HTMLElement, options?: FocusOptions) {
    if (element) {
      element.focus(options);
      if (this.isKeyboardNavigation) {
        element.classList.add('keyboard-focused');
      }
    }
  }

  trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    container.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
}
