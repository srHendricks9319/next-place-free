import { useContext, useEffect, useState } from "react";
import ListingTile from "../components/listing";
import Map from "../components/map";
import { SearchContext } from "../context/searchContext";
import { SettingsContext } from "../context/settings.context";
import { Coordinate } from "../models/address.model";
import { Listing } from "../models/listing.model";
import getIntersectingArea from "../services/iso.service";
import getListings from "../services/listings.service";

export type PolygonDetails = {
  area: number[][];
  markers?: H.map.Group;
  center: Coordinate;
};

type ListingDetails = {
  location: {
    address: {
      coordinate: {
        lat: number;
        lon: number;
      };
    };
  };
  list_price: number;
  href: string;
};

export default function Search() {
  const { addresses } = useContext(SearchContext);
  const { rapidKey, openRouteServiceKey } = useContext(SettingsContext);
  const [polygon, setPolygon] = useState<PolygonDetails | undefined>();
  const [listings, setListings] = useState<[] | undefined>();

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

      const listings = await createListingsDetails(data.poly);
      setPolygon({
        area: data.poly,
        center: data.center,
        markers: createLocationMarkerGroup(listings),
      });
    }
  }

  async function createListingsDetails(polygon: number[][]) {
    try {
      const response = await getListings({
        polygon: polygon,
        rapidKey: rapidKey,
      });
      setListings(response);
      return response;
    } catch (error) {
      // TODO: Handle error with getting listings
    }
  }

  function createLocationMarkerGroup(listings: any[]): H.map.Group {
    let markers: H.map.Marker[] = [];

    // Address marker
    markers.push(
      new H.map.Marker({
        lat: addresses![0].position.lat,
        lng: addresses![0].position.lng,
      })
    );

    if (listings?.length) {
      markers = markers.concat(
        listings.map((listing: ListingDetails, index: number) => {
          const { lat, lon } = listing.location.address.coordinate;
          const marker = new H.map.Marker({
            lat,
            lng: lon,
          });
          marker.setData(
            `<div>House ${index + 1}<br />Price: ${
              listing.list_price
            }</div><div><a href="${listing.href}">Link</a></div>`
          );
          return marker;
        })
      );
    }

    const group = new H.map.Group();
    group.addObjects(markers);

    return group;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div
        id="content"
        style={{ maxHeight: "calc(100vh - 3.5rem)" }}
        className="flex"
      >
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
          <Map addresses={addresses} polygon={polygon} />
        </div>
      </div>
    </div>
  );
}
