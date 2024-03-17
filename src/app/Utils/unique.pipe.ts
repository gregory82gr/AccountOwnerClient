import { Pipe, PipeTransform } from '@angular/core';
import { Account } from '../_interfaces/account.model';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(list: any[]){
    return list;

    // for(const item of value){
    //   const resultArray=[];
    //   console.log(!value.owner.include(item[propName]));
    //   if(!value.owner.include(item[propName])){
    //       resultArray.push(item);
    //   }

    //  for(const item of value){
    //   const resultArray=[];

    //       resultArray.push(item);

    //    return resultArray;
    //  }
    // return null;
  }

}
