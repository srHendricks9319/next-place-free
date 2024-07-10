export type MarkerDetails = {
  id: string;
  label: string;
  active?: boolean;
  location: Coordinate;
};

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

export function constructReverseCoordinates(data: any): number[][] {
  const reverseList = [];
  for (const coordinate of data) {
    reverseList.push([coordinate[1], coordinate[0]]);
  }
  return reverseList;
}
