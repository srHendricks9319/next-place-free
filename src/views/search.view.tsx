import { useContext, useEffect, useRef, useState } from "react";
import ListingTile from "../components/listing";
import Map from "../components/map";
import SearchBar from "../components/searchBar";
import { SearchContext } from "../context/searchContext";
import { SettingsContext } from "../context/settings.context";
import { Coordinate, SearchAddress } from "../models/address.model";
import { Listing } from "../models/listing.model";
import getIntersectingArea from "../services/iso.service";
import getListings from "../services/listings.service";
import * as filterUtil from "../utils/filter.util";

export type PolygonDetails = {
  area: number[][];
  center: Coordinate;
};

export default function Search() {
  const { addresses } = useContext(SearchContext);
  const { rapidKey, openRouteServiceKey } = useContext(SettingsContext);
  const [polygon, setPolygon] = useState<PolygonDetails | undefined>();
  const [listings, setListings] = useState<Listing[] | undefined>();
  const [filterCriteria, setFilterCriteria] = useState<Record<string, any>>({});
  const listingData = useRef<Listing[]>([]);

  useEffect(() => {
    if (listings)
      Array.prototype.concat(
        markers,
        listings?.map((listing: Listing): Coordinate => {
          return {
            lat: listing.location.address.coordinate.lat,
            lng: listing.location.address.coordinate.lon,
          };
        })
      );
  }, [listings]);

  // FIX: Fix issue where listing is undefined
  let markers: Coordinate[] | undefined = addresses?.map(
    (address: SearchAddress): Coordinate => {
      return {
        lat: address.position.lat,
        lng: address.position.lng,
      };
    }
  );

  useEffect(() => {
    createMapDetails();
  }, []);

  async function createMapDetails() {
    if (addresses) {
      const data = await getIntersectingArea({
        locations: [addresses[0].position],
        range: [addresses[0].distance],
        orsKey: openRouteServiceKey,
      });

      getListingDetails(data.poly);
      setPolygon({
        area: data.poly,
        center: data.center,
      });
    }
  }

  useEffect(() => {
    applyFilters();
  }, [filterCriteria]);

  function applyFilters(): void {
    const allListings = structuredClone(listingData.current);
    setListings(
      filterUtil.filterListings(allListings, [
        (listing) => filterUtil.filterByPrice(listing, filterCriteria.price),
        (listing) => filterUtil.filterByState(listing, filterCriteria.state),
        (listing) => filterUtil.filterByBedrooms(listing, filterCriteria.beds),
        (listing) => filterUtil.filterByBaths(listing, filterCriteria.baths),
        (listing) => filterUtil.filterBySqft(listing, filterCriteria.sqft),
      ])
    );
  }

  async function getListingDetails(polygon: number[][]) {
    try {
      listingData.current = await getListings({
        polygon: polygon,
        rapidKey: rapidKey,
      });
      setListings(listingData.current);
    } catch (error) {
      // TODO: Handle error with getting listings
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <SearchBar
        updateFunctions={{
          price: (value: number) =>
            setFilterCriteria((prev) => {
              return { ...prev, price: value };
            }),
          bedrooms: (value: number) =>
            setFilterCriteria((prev) => {
              return { ...prev, beds: value };
            }),
          baths: (value: number) =>
            setFilterCriteria((prev) => {
              return { ...prev, baths: value };
            }),
          sqft: (value: number) =>
            setFilterCriteria((prev) => {
              return { ...prev, sqft: value };
            }),
          state: (value: string) =>
            setFilterCriteria((prev) => {
              return { ...prev, state: value };
            }),
        }}
      />
      <div id="content" className="flex grow">
        <div
          id="sidebar"
          className="w-1/4 pt-6 flex flex-col gap-6 items-center overflow-y-auto"
        >
          {listings?.map((listing: Listing) => (
            <ListingTile listing={listing}></ListingTile>
          ))}
        </div>
        <div
          id="map"
          className="w-3/4 max-h-dvh flex justify-center items-center bg-slate-300"
        >
          <Map markers={markers} polygon={polygon} />
        </div>
      </div>
    </div>
  );
}
