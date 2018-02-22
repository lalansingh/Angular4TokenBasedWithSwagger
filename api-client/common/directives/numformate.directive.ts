import { Directive, Input, ElementRef, EventEmitter, HostListener } from "@angular/core";

@Directive({
    //selector: 'num-formate', //element
    selector: '[numformate]', //attribute
    //inputs: ['value', 'formate'],
    inputs: ['numformate'],
    outputs: ['everySecond'],
    host: { '(click)': 'onClick($event.target)' }
})
export class NumFormate {
    private numformate: number;
    private everySecond: any = new EventEmitter<string>();
    //private formate: string;
    // @Input() value: number;
    // @Input() formate: string;

    public constructor(private elementRef: ElementRef) {
        //setInterval(() => this.everySecond.emit("event"), 1000);
    }
    ngOnInit() {
        // alert(this.numformate);
    }
    private onClick(): void {
        alert('clicked');
    }
    @HostListener('mouseenter') onmouseenter(): void {
        // alert('mouseenter')
    }
    @HostListener('mouseleave') onmousemouseleave(): void {
        // alert('mouseleave')
    }
}
