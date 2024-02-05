import H from "@here/maps-api-for-javascript";
import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../context/settings.context";
import { Coordinate, SearchAddress } from "../models/address.model";
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

export default function Map({ addresses }: { addresses?: SearchAddress[] }) {
  const { hereKey, openRouteServiceKey, rapidKey } =
    useContext(SettingsContext);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<H.Map | null>(null);
  const platform = useRef<H.service.Platform | null>(null);
  const [polygon, setPolygon] = useState<PolygonDetails | undefined>();

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

  async function createPolygonDetails() {
    if (addresses) {
      const data = await getIntersectingArea({
        locations: [addresses[0].position],
        range: [addresses[0].distance],
        orsKey: openRouteServiceKey,
      });

      const listings = await createListingsDetails(data.poly);
      const formattedPolygon = {
        area: data.poly,
        center: data.center,
        markers: createLocationMarkerGroup(listings),
      };

      setPolygon(formattedPolygon);
    }
  }

  async function createListingsDetails(polygon: number[][]) {
    try {
      const response = await getListings({
        polygon: polygon,
        rapidKey: rapidKey,
      });
      return response;
    } catch (error) {
      // TODO: Handle error with getting listings
    }
  }

  function addPolygonAndMarkersToMap(map: H.Map) {
    let polyLine: number[] = [];
    polygon!.area.forEach((element) =>
      polyLine.push(element[0], element[1], 100)
    );

    const lineString = new H.geo.LineString(polyLine);
    map.removeObjects(map.getObjects());
    map.addObject(new H.map.Polygon(lineString));
    if (polygon!.markers) {
      map.addObject(polygon!.markers);
    }
  }

  function createMap(center: Coordinate): H.Map {
    if (!mapRef.current) throw new Error("Map not found on page");

    // Create a platform object with the API key
    platform.current = new H.service.Platform({ apikey: hereKey! });
    // Create a new Raster Tile service instance
    const rasterTileService = platform.current.getRasterTileService({
      queryParams: {
        style: "explore.day",
        size: 512,
      },
    });
    // Creates a new instance of the H.service.rasterTile.Provider class
    // The class provides raster tiles for a given tile layer ID and pixel format
    const rasterTileProvider = new H.service.rasterTile.Provider(
      rasterTileService
    );
    // Create a new Tile layer with the Raster Tile provider
    const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
    // Create a new map instance with the Tile layer, center and zoom level
    const newMap = new H.Map(mapRef.current, rasterTileLayer, {
      pixelRatio: window.devicePixelRatio,
      center: {
        lat: center.lat,
        lng: center.lng,
      },
    });

    // Add panning and zooming behavior to the map
    new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));

    newMap.setZoom(11);

    return newMap;
  }

  useEffect(() => {
    createPolygonDetails();
  }, [addresses]);

  useEffect(() => {
    // Check if the map object has already been created
    if (!map.current && polygon?.center) {
      map.current = createMap(polygon.center);
      window.addEventListener("resize", () =>
        map.current!.getViewPort().resize()
      );
      addPolygonAndMarkersToMap(map.current);
    } else if (map.current && polygon?.center) {
      map.current.setCenter(polygon.center);
      addPolygonAndMarkersToMap(map.current);
    }
  }, [polygon]);

  if (!addresses) {
    return <div className="text-gray-500">Enter an address..</div>;
  } else {
    return <div style={{ width: "100%", height: "100%" }} ref={mapRef} />;
  }
}
