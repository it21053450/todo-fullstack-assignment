import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate',
  standalone: true,
})
export class LocalDatePipe implements PipeTransform {
  transform(value: string | Date, format: string = 'short'): string {
    if (!value) return '';

    // Convert to Date object if it's a string
    const date = typeof value === 'string' ? new Date(value) : value;

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    // Format the date using Sri Lanka timezone (Asia/Colombo)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    // Format based on the format parameter
    switch (format) {
      case 'short':
        return this.formatShort(date, options);
      case 'full':
        return this.formatFull(date);
      case 'time':
        return this.formatTime(date, options);
      default:
        return date.toString();
    }
  }

  private formatShort(
    date: Date,
    options: Intl.DateTimeFormatOptions
  ): string {
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);

    let year = '',
      month = '',
      day = '',
      hour = '',
      minute = '',
      second = '',
      period = '';

    for (const part of parts) {
      switch (part.type) {
        case 'year':
          year = part.value;
          break;
        case 'month':
          month = part.value;
          break;
        case 'day':
          day = part.value;
          break;
        case 'hour':
          hour = part.value;
          break;
        case 'minute':
          minute = part.value;
          break;
        case 'second':
          second = part.value;
          break;
        case 'dayPeriod':
          period = part.value;
          break;
      }
    }

    return `${month}/${day}/${year} ${hour}:${minute} ${period}`;
  }

  private formatFull(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Colombo',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  }

  private formatTime(date: Date, options: Intl.DateTimeFormatOptions): string {
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);

    let hour = '',
      minute = '',
      second = '',
      period = '';

    for (const part of parts) {
      switch (part.type) {
        case 'hour':
          hour = part.value;
          break;
        case 'minute':
          minute = part.value;
          break;
        case 'second':
          second = part.value;
          break;
        case 'dayPeriod':
          period = part.value;
          break;
      }
    }

    return `${hour}:${minute}:${second} ${period}`;
  }
}
