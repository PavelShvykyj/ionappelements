import { ElementRef, EventEmitter } from '@angular/core';


const focusNativeFunc = (el: ElementRef, focusemitter?: EventEmitter<boolean>, focusvalue?: boolean) => {
    if (focusvalue) {
        el.nativeElement.focus();
    }
};

const focusIonInputFunc = (el: ElementRef, focusemitter?: EventEmitter<boolean>, focusvalue?: boolean) => {
    if (focusvalue) {
        el.nativeElement.setFocus();
    }
};

const focusEditableFunc = (el: ElementRef, focusemitter?: EventEmitter<boolean>, focusvalue?: boolean) => {
    if (focusemitter) {
        focusemitter.emit(focusvalue) ;
    };
};


export const focusfunctions: {[key: string]: (el: any) => void} = {
    native: focusNativeFunc,
    ionic: focusIonInputFunc,
    editable: focusEditableFunc
};
