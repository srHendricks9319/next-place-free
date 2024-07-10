import { useContext, useEffect, useRef, useState } from "react";
import ListingTile from "../components/listing";
import Map from "../components/map";
import SearchBar from "../components/searchBar";
import { SearchContext } from "../context/searchContext";
import { SettingsContext } from "../context/settings.context";
import { Coordinate, MarkerDetails } from "../models/address.model";
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
  const [markers, setMarkers] = useState<MarkerDetails[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<Record<string, string>>(
    {}
  );
  const listingData = useRef<Listing[]>([]);

  useEffect(() => {
    setMarkers(
      Array.prototype.concat(
        {
          label: "poi",
          id: "",
          location: {
            lat: addresses![0].position.lat,
            lng: addresses![0].position.lng,
          },
        },
        listings?.map((listing: Listing): MarkerDetails => {
          return {
            id: listing.listing_id,
            label: "listing",
            location: {
              lat: listing.location.address.coordinate.lat,
              lng: listing.location.address.coordinate.lon,
            },
          };
        })
      )
    );
  }, [listings]);

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
        (listing) =>
          filterUtil.filterByMinPrice(listing, filterCriteria.minPrice),
        (listing) =>
          filterUtil.filterByMaxPrice(listing, filterCriteria.maxPrice),
        // (listing) => filterUtil.filterByState(listing, filterCriteria.state),
        (listing) => filterUtil.filterByBedrooms(listing, filterCriteria.beds),
        (listing) => filterUtil.filterByBaths(listing, filterCriteria.baths),
        // (listing) => filterUtil.filterBySqft(listing, filterCriteria.sqft),
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

  async function listingHover(id: string, active: boolean): Promise<void> {
    const markerIndex = markers.findIndex(
      (marker: MarkerDetails) => marker.id === id
    );
    if (markerIndex) {
      setMarkers((prev) => {
        const tmp = prev;
        tmp[markerIndex].active = active;
        return [...tmp];
      });
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <SearchBar
        updateFilter={(filterCriteria: Record<string, string>) => {
          setFilterCriteria({ ...filterCriteria });
        }}
        // currentFilter={filterCriteria}
      />
      <div id="content" className="flex grow h-[90%]">
        <div
          id="sidebar"
          className="w-1/2 pt-6 flex flex-row flex-wrap gap-6 overflow-y-auto justify-around"
        >
          {listings?.map((listing: Listing) => (
            <div
              onMouseEnter={() => listingHover(listing.listing_id, true)}
              onMouseLeave={() => listingHover(listing.listing_id, false)}
              className="w-5/12"
            >
              <ListingTile listing={listing}></ListingTile>
            </div>
          ))}
        </div>
        <div
          id="map"
          className="w-1/2 flex justify-center items-center bg-slate-300"
        >
          <Map markers={markers} polygon={polygon} />
        </div>
      </div>
    </div>
  );
}
