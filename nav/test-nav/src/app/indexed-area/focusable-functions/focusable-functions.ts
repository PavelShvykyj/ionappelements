import { ElementRef } from '@angular/core';

const focusNativeFunc = (el: ElementRef) => {
    el.nativeElement.focus();
};

const focusIonInputFunc = (el: ElementRef) => {
    el.nativeElement.setFocus();
};

export const focusfunctions: {[key: string]: (el: any) => void} = {
    native: focusNativeFunc,
    ionic: focusIonInputFunc
};
