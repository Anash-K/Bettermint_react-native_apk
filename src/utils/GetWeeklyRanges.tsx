export const getWeeklyRanges = (year: number, month: number) => {
    const weeks: string[] = [];

    // Get the first day and last day of the month
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0); // Last day of the month

    // Find the first Monday before or within the month
    let firstMonday = new Date(firstDayOfMonth);
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() - 1);
    }

    // Generate Monday-Sunday weekly ranges
    let currentWeekStart = new Date(firstMonday);

    while (true) {
      let currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // Get Sunday of the week

      // Stop if the week's start is outside the given month
      if (
        currentWeekStart.getMonth() + 1 !== month &&
        currentWeekEnd.getMonth() + 1 !== month
      )
        break;

      // Ensure we only add weeks that are within the current month
      if (
        currentWeekEnd.getMonth() + 1 === month ||
        currentWeekStart.getMonth() + 1 === month
      ) {
        weeks.push(
          `${currentWeekStart.getDate()}-${currentWeekEnd.getDate()}`
        );
      }

      // Move to the next week
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    return weeks;
  };