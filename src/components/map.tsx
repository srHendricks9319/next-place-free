import H from "@here/maps-api-for-javascript";
import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../context/settings.context";
import { Address, Coordinate } from "../models/address.model";
import getIntersectingArea from "../services/iso.service";

export type PolygonDetails = {
  area: number[][];
  markers?: H.map.Marker;
  center: Coordinate;
};

export default function Map({
  address,
  distance,
}: {
  address?: Address;
  distance?: number;
}) {
  const { hereKey, openRouteServiceKey } = useContext(SettingsContext);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<H.Map | null>(null);
  const platform = useRef<H.service.Platform | null>(null);
  const [polygon, setPolygon] = useState<PolygonDetails | undefined>();

  function createLocationMarkers() {
    const marker = new H.map.Marker({
      lat: address?.position.lat || 35.78028,
      lng: address?.position.lng || -78.50855,
    });
    return marker;
  }

  async function createPolygonDetails() {
    if (address && distance) {
      console.info("Creating polygon details");
      const data = await getIntersectingArea({
        locations: [address.position],
        range: [distance],
        orsKey: openRouteServiceKey,
      });

      console.debug(`Polygon data: ${JSON.stringify(data)}`);

      const formattedPolygon = {
        area: data.poly,
        center: data.center,
        markers: createLocationMarkers(),
      };

      console.debug(`Formatted polygon: ${formattedPolygon}`);

      setPolygon(formattedPolygon);
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
    if (polygon!.markers) map.addObject(polygon!.markers);
  }

  function createMap(center: Coordinate): H.Map {
    console.info("Creating map");

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
    newMap.setZoom(11);

    return newMap;
  }

  useEffect(() => {
    console.info("useEffect: address, distance");
    console.debug(`trigger address: ${address} | distance: ${distance}`);
    createPolygonDetails();
  }, [address, distance]);

  useEffect(() => {
    console.info("useEffect: polygon");
    console.debug(`polygon updated: ${polygon}`);
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

  if (!address || !distance) {
    return <div className="text-gray-500">Enter an address..</div>;
  } else {
    return <div style={{ width: "100%", height: "100%" }} ref={mapRef} />;
  }
}
