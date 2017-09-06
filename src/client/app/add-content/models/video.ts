export interface IVideo {
  date: string;
  title: string;
  viewers: string;
  preview: string;
  src: string;
  donations: number;
  id: string;
  charity: Object;
  broadcast: {
    upcoming: boolean;
    broadcast: string;
  };
}



