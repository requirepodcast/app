// @flow

export interface Episode {
  id: string;
  description: {
    html: string,
    markdown: string,
  };
  audioUrl: string;
  publicationDate: string;
  shortDescription: string;
  title: string;
  youtubeUrl: string;
  spotifyUrl: string;
}
