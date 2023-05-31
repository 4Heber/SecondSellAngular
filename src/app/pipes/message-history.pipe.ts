import { Pipe, PipeTransform } from '@angular/core'
import { Message, Offer } from 'src/app/models/chat.model';


@Pipe({
  name: 'getByDatePipe',
})
export class getByDatePipe implements PipeTransform {
  transform(offers: Offer[], messages: Message[]): any[] {
    while (offers.length > 1) {
      offers.shift();
    }
    const combinedList = [...offers, ...messages];

    combinedList.sort((b, a) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA.getTime() - dateB.getTime();
    });

    return combinedList;
  }

}
