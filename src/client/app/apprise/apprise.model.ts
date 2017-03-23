export interface IArticle {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  description: string;
  url: string;
}

export interface IApprise {
 result: string;
 total: number;
 offset: number;
 articles: IArticle[];
}