import { FaCamera } from "react-icons/fa";
import { Listing } from "../models/listing.model";

function formatPrice(price: number) {
  return !price
    ? "N/A"
    : "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ListingTile({ listing }: { listing: Listing }) {
  const address = listing.location.address;
  return (
    <div className="flex flex-col gap" id={"listing_" + listing.property_id}>
      {listing.primary_photo?.href ? (
        <img src={listing.primary_photo.href} className="mb-2 max-h-40"></img>
      ) : (
        <div className="flex justify-center items-center bg-slate-200 h-40 mb-2">
          <FaCamera size={48} />
        </div>
      )}
      <div id="price" className="flex gap-2 items-center">
        <p className="text-lg font-bold">{formatPrice(listing.list_price)}</p>
        {listing.flags.is_price_reduced && (
          <p className="text-red-400 text-sm">Reduced price</p>
        )}
      </div>
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
