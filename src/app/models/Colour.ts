export interface Colour {
  colourId: number | null;
  colourName: string;
  colourHex: string;
}

export class ColourImpl implements Colour {
  constructor(
    public colourId: number | null,
    public colourName: string,
    public colourHex: string
  ) { }
}
