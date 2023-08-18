export interface Review {
  nid: number;
  content: string;
  goodPoint: string[];
  timestamp: number;
}

export interface ImageType {
  id: number;
  url: string;
}

export interface FileType {
  timestamp: number;
  filename: string;
  url: string;
}
