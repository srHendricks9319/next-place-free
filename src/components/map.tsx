import H from "@here/maps-api-for-javascript";
import { useContext, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { FaDotCircle } from "react-icons/fa";
import { SettingsContext } from "../context/settings.context";
import { Coordinate } from "../models/address.model";
import { PolygonDetails } from "../views/search.view";

export default function Map({
  markers,
  polygon,
}: {
  markers?: Coordinate[];
  polygon?: PolygonDetails;
}) {
  const { hereKey } = useContext(SettingsContext);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<H.Map | null>(null);
  const platform = useRef<H.service.Platform | null>(null);

  function addPolygonAndMarkersToMap(map: H.Map) {
    let polyLine: number[] = [];
    polygon!.area.forEach((element: number[]) =>
      polyLine.push(element[0], element[1], 100)
    );

    const lineString = new H.geo.LineString(polyLine);
    map.removeObjects(map.getObjects());
    map.addObject(new H.map.Polygon(lineString));

    if (markers) {
      const mapMarkers = markers.map(
        (coordinate: Coordinate) =>
          new H.map.Marker(
            { lat: coordinate.lat, lng: coordinate.lng },
            {
              data: null,
              icon: new H.map.Icon(renderToString(<FaDotCircle />)),
            }
          )
      );
      const markerGroup = new H.map.Group();
      markerGroup.addObjects(mapMarkers);
      map.addObject(markerGroup);
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
  }, [polygon, markers]);

  if (!polygon) {
    return <div className="text-gray-500">Enter an address..</div>;
  } else {
    return <div style={{ width: "100%", height: "100%" }} ref={mapRef} />;
  }
}
