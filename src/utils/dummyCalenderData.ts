import { CustomImages } from "../assets/CustomImages";

// Mapping of dates (1 to 10) to specific images
export const dateToImageMapOfStress: Record<
  string,
  { image: any; text: string }
> = {
  "2025-02-01": { image: CustomImages.confuse, text: "" },
  "2025-02-02": { image: CustomImages.smile, text: "" },
  "2025-02-03": { image: CustomImages.sad, text: "" },
  "2025-02-04": { image: CustomImages.happy, text: "" },
  "2025-02-05": { image: CustomImages.confuse, text: "" },
  "2025-02-06": { image: CustomImages.normalSmile, text: "" },
  "2025-02-07": { image: CustomImages.smile, text: "" },
  "2025-02-08": { image: CustomImages.happy, text: "" },
  "2025-02-09": { image: CustomImages.yellowLevelUp, text: "", levelup: true },
  "2025-02-10": { image: CustomImages.normalSmile, text: "" },
} as const;

export const dateToImageMapOfWorkout: Record<string, any> = {
  "2025-02-01": { image: null, text: "Lazy" },
  "2025-02-02": { image: null, text: "No Time" },
  "2025-02-03": { image: CustomImages.pinkTick, text: "" },
  "2025-02-04": { image: CustomImages.pinkTick, text: "" },
  "2025-02-05": { image: CustomImages.pinkTick, text: "" },
  "2025-02-06": { image: null, text: "Lazy" },
  "2025-02-07": { image: null, text: "Lazy" },
  "2025-02-08": { image: CustomImages.pinkTick, text: "" },
  "2025-02-09": { image: CustomImages.levelupPink, text: "", levelup: true },
  "2025-02-10": { image: CustomImages.pinkTick, text: "" },
  "2025-02-11": { image: null, text: "No Time" },
} as const;

export const dateToImageMapOfSleep: Record<string, any> = {
  "2025-02-01": { image: null, text: "Office Outing" },
  "2025-02-02": { image: null, text: "Binge Watching" },
  "2025-02-03": { image: CustomImages.pinkTick, text: "" },
  "2025-02-04": { image: CustomImages.pinkTick, text: "" },
  "2025-02-05": { image: CustomImages.pinkTick, text: "" },
  "2025-02-06": { image: null, text: "Social Outing" },
  "2025-02-07": { image: null, text: "Scrolling" },
  "2025-02-08": { image: CustomImages.pinkTick, text: "" },
  "2025-02-09": { image: CustomImages.bluelevelup, text: "", levelup: true },
  "2025-02-10": { image: CustomImages.pinkTick, text: "" },
  "2025-02-11": { image: null, text: "Scrolling" },
} as const;

export const dateToImageMapOfHomeFuel: Record<string, any> = {
  "2025-02-01": { image: null, text: "Office Outing" },
  "2025-02-02": { image: null, text: "Binge Watching" },
  "2025-02-03": { image: CustomImages.pinkTick, text: "" },
  "2025-02-04": { image: CustomImages.pinkTick, text: "" },
  "2025-02-05": { image: CustomImages.pinkTick, text: "" },
  "2025-02-06": { image: null, text: "Social Outing" },
  "2025-02-07": { image: null, text: "Scrolling" },
  "2025-02-08": { image: CustomImages.pinkTick, text: "" },
  "2025-02-09": { image: CustomImages.greenlevelup, text: "", levelup: true },
  "2025-02-10": { image: CustomImages.pinkTick, text: "" },
  "2025-02-11": { image: null, text: "Scrolling" },
} as const;

