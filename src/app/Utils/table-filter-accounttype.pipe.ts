import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'tableFilterAccountType'
})
export class TableFilterAccountTypePipe implements PipeTransform {

  transform(list: any[], value: string) {
    return value ? list.filter(item => item.accountType=== value) : list;
  }

}
