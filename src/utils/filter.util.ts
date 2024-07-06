import { Listing } from "../models/listing.model";

export function filterListings<T>(
  listings: T[],
  conditions: ((item: T) => boolean)[]
): T[] {
  return listings.filter((listing) =>
    conditions.every((condition) => condition(listing))
  );
}

export const filterByMaxPrice = (listing: Listing, maxPrice: string): boolean =>
  maxPrice ? listing.list_price < parseInt(maxPrice) : true;

export const filterByMinPrice = (listing: Listing, minPrice: string): boolean =>
  minPrice ? listing.list_price > parseInt(minPrice) : true;

export const filterByState = (listing: Listing, state: string): boolean =>
  state
    ? listing.location.address.state.toLowerCase().includes(state.toLowerCase())
    : true;

export const filterByBedrooms = (listing: Listing, beds: string): boolean =>
  beds ? listing.description.beds >= parseInt(beds) : true;

export const filterByBaths = (listing: Listing, baths: string): boolean =>
  baths ? listing.description.baths_full >= parseInt(baths) : true;

export const filterBySqft = (listing: Listing, sqft: number): boolean =>
  sqft ? listing.description.sqft >= sqft : true;
