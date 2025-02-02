class DateUtil {
  approximateDateDiffInMonths(a: Date, b: Date) {
    const _MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
    return Math.ceil((utc2 - utc1) / _MS_PER_MONTH);
  }

  formatDate(date: Date) {
    // HACK: temporarily parsing as date since the saved date atm is a string from local storage
    if (!date) {
      return '';
    }
    return Intl.DateTimeFormat('en-MY').format(new Date(date));
  }
}

export const dateUtil = new DateUtil();