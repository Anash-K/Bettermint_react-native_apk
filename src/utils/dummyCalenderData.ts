import { CustomImages } from "../assets/CustomImages";

// Mapping of dates (1 to 10) to specific images
export const dateToImageMapOfStress: Record<
  string,
  { image: any; text: string }
> = {
  "2024-02-01": { image: CustomImages.confuse, text: "" },
  "2024-02-02": { image: CustomImages.smile, text: "" },
  "2024-02-03": { image: CustomImages.sad, text: "" },
  "2024-02-04": { image: CustomImages.happy, text: "" },
  "2024-02-05": { image: CustomImages.confuse, text: "" },
  "2024-02-06": { image: CustomImages.normalSmile, text: "" },
  "2024-02-07": { image: CustomImages.smile, text: "" },
  "2024-02-08": { image: CustomImages.happy, text: "" },
  "2024-02-09": { image: CustomImages.confuse, text: "" },
  "2024-02-10": { image: CustomImages.normalSmile, text: "" },
} as const;

export const dateToImageMapOfWorkout: Record<string, any> = {
  "2024-02-01": { image: null, text: "Lazy" },
  "2024-02-02": { image: null, text: "No Time" },
  "2024-02-03": { image: CustomImages.pinkTick, text: "" },
  "2024-02-04": { image: CustomImages.pinkTick, text: "" },
  "2024-02-05": { image: CustomImages.pinkTick, text: "" },
  "2024-02-06": { image: null, text: "Lazy" },
  "2024-02-07": { image: null, text: "Lazy" },
  "2024-02-08": { image: CustomImages.pinkTick, text: "" },
  "2024-02-09": { image: CustomImages.levelupPink, text: "", levelup:true },
  "2024-02-10": { image: CustomImages.pinkTick, text: "" },
  "2024-02-11": { image: null, text: "No Time" },
} as const;

export const dateToImageMapOfSleep: Record<string, any> = {
  "2024-02-01": { image: null, text: "Office Outing" },
  "2024-02-02": { image: null, text: "Binge Watching" },
  "2024-02-03": { image: CustomImages.pinkTick, text: "" },
  "2024-02-04": { image: CustomImages.pinkTick, text: "" },
  "2024-02-05": { image: CustomImages.pinkTick, text: "" },
  "2024-02-06": { image: null, text: "Social Outing" },
  "2024-02-07": { image: null, text: "Scrolling" },
  "2024-02-08": { image: CustomImages.pinkTick, text: "" },
  "2024-02-09": { image: CustomImages.levelupPink, text: "", levelup:true },
  "2024-02-10": { image: CustomImages.pinkTick, text: "" },
  "2024-02-11": { image: null, text: "Scrolling" },
} as const;

