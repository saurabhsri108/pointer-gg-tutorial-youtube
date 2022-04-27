import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: [],
})
export class KeyboardComponent implements OnInit {
  @Input() kind: number = 0;
  @Input() type: string = '';
  @Input() filter: string = '';
  @Input() owner: string = '';
  @Input() preview: boolean = false;
  @Input() currentOwner: string = '';

  public alt: string = '';
  public imagePath: string = '';
  public style: string = '';
  public connectedAccount: string = this.currentOwner;

  constructor() {}

  ngOnInit(): void {
    this.displayImage();
  }

  displayImage() {
    const kindDir = this.getKindDir(this.kind);
    const filename = this.type;
    this.imagePath = `assets/keyboards/${kindDir}/${filename}.png`;
    this.alt = `${kindDir} keyboard with ${filename} keys ${
      this.filter
        ? `with
${this.filter}`
        : ''
    }`;
    this.style = this.filter;

    console.log(this.kind, this.type, this.filter, this.connectedAccount);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['kind']) {
      this.kind = changes['kind'].currentValue;
    }
    if (changes['type']) {
      this.type = changes['type'].currentValue;
    }
    if (changes['filter']) {
      this.filter = changes['filter'].currentValue;
    }
    this.displayImage();
  }

  getKindDir(kind: number) {
    return {
      0: 'sixty-percent',
      1: 'seventy-five-percent',
      2: 'eighty-percent',
      3: 'iso-105',
    }[kind];
  }
}
