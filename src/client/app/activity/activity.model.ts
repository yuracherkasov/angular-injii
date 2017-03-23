interface IArtist {
  id: string;
  band: string;
  username: string;
  firstname: string;
  lastname:  string;
}

interface ICharity {
  id: string;
  charityname: string;
  username: string;
  firstname: string;
  lastname:  string;
}

export interface ISponsor {
  id: string;
  name: string;
}

export interface IVideo {
  id: string;
  title: string;
  preview: string;
  gendre: string;
  viewers: number;
  date: string;
  donations: number;
  artist: IArtist;
  charity: ICharity;
  sponsor: ISponsor;
}
