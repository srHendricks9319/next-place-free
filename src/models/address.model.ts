export type Coordinate = {
  label: string;
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
