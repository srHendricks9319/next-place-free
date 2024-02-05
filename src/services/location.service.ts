import { Address } from "../models/address.model";
import { InvalidParameterError, MissingKeyError } from "../models/error.model";

export default async function decodeGeolocation(
  address?: string,
  hereKey?: string
): Promise<Address> {
  if (!hereKey)
    throw new MissingKeyError(
      "API key not provided. Go to settings to save your keys"
    );

  if (!address) {
    throw new InvalidParameterError("Enter in a valid address");
  }
  const constructedRequest = `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${hereKey}&searchtext=${address}`;

  try {
    const response = await fetch(constructedRequest);
    const responseBody = await response.json();

    if (
      responseBody?.Response?.View[0]?.Result[0]?.Location
        ?.NavigationPosition[0] &&
      responseBody?.Response?.View[0]?.Result[0]?.Location?.Address
    ) {
      let returnObject = {
        label: responseBody.Response.View[0].Result[0].Location.Address.Label,
        position: {
          lat: responseBody.Response.View[0].Result[0].Location
            .NavigationPosition[0].Latitude,
          lng: responseBody.Response.View[0].Result[0].Location
            .NavigationPosition[0].Longitude,
        },
      };
      return returnObject;
    } else {
      throw new Error(
        `Response did not send location data: ${JSON.stringify(response)}`
      );
    }
  } catch (error) {
    throw new Error(
      `Here request at 'decodeGeolocation' with url: ${constructedRequest} and return an error: ${error}`
    );
  }
}
