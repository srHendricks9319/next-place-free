export type Listing = {
  __typename: string;
  property_id: string;
  listing_id: string;
  plan_id: null;
  status: string;
  photo_count: number;
  branding: Branding[];
  location: Location;
  open_houses: null;
  description: Description;
  virtual_tours: PrimaryPhoto[];
  matterport: boolean;
  advertisers: Advertiser[];
  flags: Flags;
  source: Source;
  pet_policy: null;
  community: null;
  primary_photo: PrimaryPhoto;
  href: string;
  list_price: number;
  list_price_min: null;
  list_price_max: null;
  price_reduced_amount: null;
  estimate: Estimate;
  lead_attributes: LeadAttributes;
  last_sold_date: string;
  list_date: string;
  products: Products;
  last_sold_price: number;
};

export type Advertiser = {
  __typename: string;
  fulfillment_id: string;
  name: string;
  email: string;
  href: null;
  slogan: null;
  type: string;
};

export type Branding = {
  __typename: string;
  photo: null;
  name: string;
  phone: null;
  link: null;
};

export type Description = {
  __typename: string;
  sub_type: null;
  type: string;
  beds: number;
  baths: number;
  lot_sqft: number;
  sqft: number;
  beds_max: null;
  beds_min: null;
  sqft_max: null;
  sqft_min: null;
  baths_full: number;
  baths_half: number;
  baths_min: null;
  baths_max: null;
  baths_full_calc: number;
  baths_partial_calc: number;
};

export type Estimate = {
  __typename: string;
  estimate: number;
};

export type Flags = {
  __typename: string;
  is_price_reduced: null;
  is_new_construction: null;
  is_foreclosure: null;
  is_plan: null;
  is_new_listing: boolean;
  is_coming_soon: null;
  is_contingent: null;
  is_pending: null;
};

export type LeadAttributes = {
  __typename: string;
  lead_type: string;
  show_contact_an_agent: boolean;
  opcity_lead_attributes: OpcityLeadAttributes;
};

export type OpcityLeadAttributes = {
  __typename: string;
  flip_the_market_enabled: boolean;
};

export type Location = {
  __typename: string;
  address: Address;
  street_view_url: string;
  county: County;
};

export type Address = {
  __typename: string;
  city: string;
  line: string;
  street_name: string;
  street_number: string;
  street_suffix: string;
  country: string;
  postal_code: string;
  state_code: string;
  state: string;
  coordinate: Coordinate;
};

export type Coordinate = {
  __typename: string;
  lat: number;
  lon: number;
  accuracy: null;
};

export type County = {
  __typename: string;
  fips_code: string;
};

export type PrimaryPhoto = {
  __typename: string;
  href: string;
};

export type Products = {
  __typename: string;
  brand_name: string;
  products: string[];
};

export type Source = {
  __typename: string;
  agents: Agent[];
  id: string;
  type: string;
  spec_id: null;
  plan_id: null;
  listing_href: null;
  listing_id: string;
};

export type Agent = {
  __typename: string;
  id: string;
  agent_id: string;
  agent_name: string;
  office_id: string;
  office_name: null;
};
