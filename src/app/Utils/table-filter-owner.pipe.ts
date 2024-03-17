import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'tableFilterOwner'
})
export class TableFilterOwnerPipe implements PipeTransform {

  transform(list: any[], value: string) {
    return value ? list.filter(item => item.owner=== value) : list;
  }

}
