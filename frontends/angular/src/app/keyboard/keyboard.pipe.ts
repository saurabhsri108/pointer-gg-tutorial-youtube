import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressesEqual',
})
export class KeyboardPipe implements PipeTransform {
  transform(owner: string, connectedAccount: string): boolean {
    if (!owner || !connectedAccount) return false;
    return owner.toUpperCase() === connectedAccount.toUpperCase();
  }
}
