export type Coordinate = {
  lat: number;
  lng: number;
};

export type Address = {
  label: string;
  position: Coordinate;
};

export type SearchAddress = Address & {
  distance: number;
};
