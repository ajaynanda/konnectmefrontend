import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'name' })
export class NamePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.split('').map((x:any)=>`${x.Firstname} ${x.Lastname}`).join('')
  }
}
