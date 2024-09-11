export const slugGenerator = (listing) => {
  const parts = [];

  if (listing?.Street) {
    parts.push(listing.Street);
  }

  if (listing?.StreetName) {
    const streetName = listing.StreetName.trim().replace(/ /g, "-");
    parts.push(streetName);
  }

  if (listing?.StreetAbbreviation) {
    parts.push(listing.StreetAbbreviation);
  }

  if (listing?.MLS) {
    parts.push(listing.MLS);
  }

  return parts.filter(Boolean).join("-");
};
