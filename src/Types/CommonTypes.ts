export interface Loader {
    start: () => void;
    stop: () => void;
  }

  export interface TimeTrackerType {
    sleepTime: string;
    wakeupTime: string;
  };


  export interface TextOption {
    id: number;
    label: string;
  }
  