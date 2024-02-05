import { constructReverseCoordinates } from "../models/address.model";
import { InvalidParameterError, MissingKeyError } from "../models/error.model";

type ListingSearch = {
  polygon?: number[][];
  rapidKey?: string;
};

export default async function getListings(data: ListingSearch) {
  if (!data.rapidKey)
    throw new MissingKeyError(
      "API key not provided. Go to settings to save your keys"
    );

  if (!data.polygon) {
    throw new InvalidParameterError("Enter in a valid polygon");
  }

  // TODO: Figure out boundaryBox usage
  // let boundary = getBoundaryBoxFromPolygon(data.polygon);
  const requestOptions = {
    method: "POST",
    headers: {
      "x-rapidapi-host": "realty-in-us.p.rapidapi.com",
      "x-rapidapi-key": data.rapidKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      offset: "0",
      limit: "10",
      status: ["for_sale", "ready_to_build"],
      boundary: {
        coordinates: [constructReverseCoordinates(data.polygon)],
      },
    }),
  };
  try {
    const response = await fetch(
      "https://realty-in-us.p.rapidapi.com/properties/v3/list",
      requestOptions
    );

    let responseBody;

    if (response.headers.get("content-type")?.includes("json")) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    return responseBody.data.home_search.results;
  } catch (error) {
    throw error;
  }
}

// function getBoundaryBoxFromPolygon(polygon: number[][]) {
//   let allLatitudes = polygon.map((e) => e[0]);
//   let allLongitudes = polygon.map((e) => e[1]);

//   return {
//     top: Math.max(...allLatitudes),
//     bottom: Math.min(...allLatitudes),
//     left: Math.max(...allLongitudes),
//     right: Math.min(...allLongitudes),
//   };
// }
