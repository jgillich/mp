import {Doc} from "./";

export interface Track extends Doc<TrackAttributes>  {

}

export interface TrackAttributes {
  album: number;
  artist: number;
  number: number;
  title: string;
  uri: TrackUri;
};

export interface TrackUri {
  id: string;
  backend: string;
  owner: string;
}
