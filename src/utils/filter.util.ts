import { Listing } from "../models/listing.model";

export function filterListings<T>(
  listings: T[],
  conditions: ((item: T) => boolean)[]
): T[] {
  return listings.filter((listing) =>
    conditions.every((condition) => condition(listing))
  );
}

export const filterByPrice = (listing: Listing, price: number): boolean =>
  price ? listing.list_price < price : true;

export const filterByState = (listing: Listing, state: string): boolean =>
  state
    ? listing.location.address.state.toLowerCase().includes(state.toLowerCase())
    : true;

export const filterByBedrooms = (listing: Listing, beds: number): boolean =>
  beds ? listing.description.beds >= beds : true;

export const filterByBaths = (listing: Listing, baths: number): boolean =>
  baths ? listing.description.baths_full >= baths : true;

export const filterBySqft = (listing: Listing, sqft: number): boolean =>
  sqft ? listing.description.sqft >= sqft : true;
