import { Pipe, PipeTransform } from '@angular/core'
import { User } from 'src/app/models/user.model';


@Pipe({
  name: 'getuser',
})
export class getUserPipe implements PipeTransform {
  transform(uid: number, mainId: number, ref: number, users: User[]): User {
    if (uid === mainId) {
      return users.find(user => user.id === ref)!
    }
    return users.find(user => user.id === uid)!

  }
}
