import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysAndValues'
})
export class KeysAndValuesPipe implements PipeTransform {

    transform(value: any, args?: any): any {
	let objs:any = [];
	for (let obj in value){
	    objs.push({key: obj, value: value[obj]});
	}
	return objs;
  }

}
