export interface Event {
    id: string;
    title: string;
    description?: string;
    startTime: string;
    media?: {
      type: "image" | "video";
      url: string;
    }[];
  }
  