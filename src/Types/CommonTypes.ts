export interface LoaderType {
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
  