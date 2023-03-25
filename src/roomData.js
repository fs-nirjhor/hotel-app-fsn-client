import Single from "./images/Single.png";
import Double from "./images/Double.png";
import Family from "./images/Family.png";

const RoomData = [
  {
    title: "Standard Single Room",
    description:
      "Standard Single Rooms are designed in open -concept living area and have many facilities.",
    image: Single,
    imgUrl:
      "https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/offers/offer-images/burj-al-arab-presidential-suite-living-room-4-hero.jpg",
    bed: 1,
    capacity: 1,
    bedType: "Single",
    avatar: "S",
    price: 119,
  },
  {
    title: "Couple Power Room",
    description:
      "Superior Double Rooms are perfectly equipped for traveling couples or friends.",
    image : Double,
    imgUrl:
      "https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/offers/offer-images/burj-al-arab-royal-suite-staircase-5-hero.jpg",
    bed: 1,
    capacity: 2,
    bedType: "Double",
    avatar: "D",
    price: 149,
  },
  {
    title: "Family Capacity Room",
    description:
      " Have lots of in-room facilities and are designed in open-concept living area.",
    image : Family,
    imgUrl:
      "https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/hotels/dubai/burj-al-arab-jumeirah/room/presidential-two-bedroom-suite/burj-al-arab-presidential-suite-guest-bedroom_6-4_landscape/burj-al-arab-presidential-suite-guest-bedroom_16-9_landscape.jpg?w=2080",
    bed: 2,
    capacity: 4,
    bedType: "Family",
    avatar: "F",
    price: 199,
  },
];
export default RoomData;
