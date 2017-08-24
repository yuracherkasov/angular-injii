export class Video {
  artist: {
    name: string,
    id: number
  };
  date: string;
  genre: string;
  title: string;
  viewers: number;
  preview: string;
  src: string;
  id: number;
  startTime: string;
  endTime: string;
};

export interface IVideo {
  date: string;
  title: string;
  viewers: string;
  preview: string;
  src: string;
  donations: number;
  id: string;
  charity: Object;
}



