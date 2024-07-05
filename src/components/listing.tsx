import { Listing } from "../models/listing.model";

function formatPrice(price: number) {
  return !price
    ? "N/A"
    : "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ListingTile({ listing }: { listing: Listing }) {
  const address = listing.location.address;
  return (
    <div className="flex flex-col gap w-3/4">
      <img src={listing.primary_photo?.href ?? ""} className="mb-2"></img>
      <p className="text-lg font-bold">{formatPrice(listing.list_price)}</p>
      <div className="flex gap-3">
        <p>{listing.description.beds} bds</p>
        <p>{listing.description.baths} ba</p>
        <p>{listing.description.sqft} sqft</p>
        <p>{(listing.description.lot_sqft / 43560).toFixed(2)} acr</p>
      </div>
      <a target="_blank" href={listing.href}>
        <p>
          {address.street_number} {address.street_name}
        </p>
        <p>
          {address.city}, {address.state} {address.postal_code}
        </p>
      </a>
      <span className="text-xs">Source: {listing.source.__typename}</span>
    </div>
  );
}
