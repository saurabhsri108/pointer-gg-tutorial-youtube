import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
})
export class KeyboardComponent implements OnInit {
  @Input() kind: number = 0;
  @Input() type: string = '';
  @Input() filter: string = '';
  @Input() owner: string = '';
  @Input() preview: boolean = false;

  public alt: string = '';
  public imagePath: string = '';
  public style: string = '';
  public connectedAccount: string = <string>localStorage.getItem('metamask');

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

  addressesEqual(addr1: string, addr2: string) {
    if (!addr1 || !addr2) return false;
    return addr1.toUpperCase() === addr2.toUpperCase();
  }
}
