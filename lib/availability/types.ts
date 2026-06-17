export type TimeRange = {
  startTime: string; // "09:00"
  endTime: string; // "17:00"
};

export type WeeklyAvailability = TimeRange & {
  dayOfWeek: number; // 0 = Sunday ... 6 = Saturday
};

export type DateOverrideInput = {
  date: Date;
  isBlocked: boolean;
  startTime: string | null;
  endTime: string | null;
};

export type ExistingBooking = {
  startTime: Date;
  endTime: Date;
};

export type AvailableSlot = {
  /** UTC instant for the slot start */
  startUtc: string;
  /** Wall-clock time in the client's timezone, e.g. "09:30" */
  label: string;
};
