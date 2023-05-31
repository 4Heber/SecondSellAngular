import { Pipe, PipeTransform } from '@angular/core'


@Pipe({
  name: 'timedif',
})
export class TimePipe implements PipeTransform {
  transform(created_at: Date): string {
    const timeElapsed = Date.now() - new Date(created_at).getTime();
    const seconds = timeElapsed / 1000;
    if (seconds < 2) {
      return `${Math.floor(seconds)} segundo`;
    }
    if (seconds < 60) {
      return `${Math.floor(seconds)} segundos`;
    }
    const minutes = seconds / 60;
    if (minutes < 2) {
      return `${Math.floor(minutes)} minuto`;
    }
    if (minutes < 60) {
      return `${Math.floor(minutes)} minutos`;
    }
    const hours = minutes / 60;
    if (hours < 2) {
      return `${Math.floor(hours)} hora`;
    }
    if (hours < 24) {
      return `${Math.floor(hours)} horas`;
    }
    const days = hours / 24;
    if (days < 2) {
      return `${Math.floor(days)} día`;

    }
    if (days < 7) {
      return `${Math.floor(days)} días`;
    }
    const weeks = days / 7;
    if (weeks < 2) {
      return `${Math.floor(weeks)} semana`;
    }
    if (weeks < 5) {
      return `${Math.floor(weeks)} semanas`;
    }
    const months = days / 30;
    if (months < 2) {
      return `${Math.floor(months)} mes`;

    }
    return `${Math.floor(months)} meses`;

  }
}
