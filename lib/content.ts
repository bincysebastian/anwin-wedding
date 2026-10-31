import type { CSSProperties } from "react";

const F = "/images/figma";
/** Original photos supplied by the couple (pic-1 to pic-6), in page order. */
const P = "/images/photos";

export const site = {
  brand: "Bincy",
  couple: "Anwin & Bia",
  subtitle: "Together, beneath the sky",
  bride: "Bia",
  groom: "Anwin",
  weddingDateShort: "4 JANUARY 2027",
  church: "St. Joseph Syro Malabar Church, Punnakunnam",
  invitationTitle: "An Evening Blessed with Love",
  /** Countdown target (IST). */
  weddingStart: "2027-01-04T00:00:00+05:30",
  footerDate: "04 · 01 · 2027",
};

export const navLinks = [
  { label: "Save the Date", href: "#save-the-date" },
  { label: "Our Story", href: "#our-story" },
  { label: "The Day", href: "#the-day" },
  { label: "Dress Code", href: "#dress-code" },
];

export const families = {
  grandparentsLabel: "Together with the blessings of our grandparents",
  grandparents: "Late Mr. K C Varghese & Late Mrs. Ellyamma Varghese",
  parentsLabel: "And the love of our parents",
  parents: "Late Mr. Sony Varghese & Mrs. Jolly Sony",
  groomHouse: "Kappil Koippally House, Pulinkunnu, Alappuzha",
  request: "request the pleasure of your gracious presence at the marriage of our beloved son",
  groom: "Anwin Varghese Sony",
  joiner: "With",
  bride: "Bia Maria Jacob",
  brideParents: "D/o Mrs. Lijimol James and Mr. Jacob Sebastian",
  brideGrandparents: [
    "Grand D/o Mrs. Mariyakutty Devasia & Late Mr. Chacko Devasia",
    "&",
    "Late Mrs. Leelama Chacko & Late Mr. Chacko Varkey",
  ],
  brideHouse: "Ganapathiplackal house, Thodanal P.O, Pala, Kottayam",
};

export const warmestWishes = {
  label: "With warmest wishes from",
  names: ["Aswin Sony", "Dia Elizabeth Jacob", "Cia Ann Jacob & Alwin Johny"],
  title: "With Love & Joy",
  lines: [
    "We would like to invite you to celebrate our wedding day with us.",
    "Your presence would make our special day even more meaningful. We hope you can join us as we begin this beautiful journey together. WITH LOVE,",
  ],
  couple: "Anwin Sony & Bia Maria Jacob",
};

export const colourCode = {
  title: "Guest Dress Colour Code",
  palette: "Shades of Blue",
  copy: "We would like to embrace the elegance of Western formal wear or the timeless beauty of Indian traditional attire reflecting an English Christian wedding. Pastel shades preferred.",
};

export const images = {
  hero: `${P}/hero.jpg`,
  ornament: `${F}/ornament.svg`,
  ornamentMobile: `${F}/ornament-mobile.svg`,
  dressPalette: `${P}/dress-blue-shades.jpg`,
  sparkle: `${F}/sparkle.svg`,
  sprite: `${F}/scratch-cover.png`,
  dateReveal: `${P}/save-the-date.jpg`,
  scratchCursor: `${F}/scratch-cursor.svg`,
  invitation: `${P}/invitation.jpg`,
  invitationGradient: `${F}/rsvp-gradient.svg`,
  invitationScrimMobile: `${F}/rsvp-scrim-mobile.svg`,
  faceHappy: `${F}/face-happy.svg`,
  faceSad: `${F}/face-sad.svg`,
  arrowUpRight: `${F}/arrow-up-right.svg`,
  sealSparkle: `${F}/seal-sparkle.svg`,
  heartPhoto: `${P}/heart.jpg`,
  heartMask: `${F}/heart-mask.svg`,
};

/** Crop of an oversized image inside a box, as percentages of the box (from Figma). */
export type Crop = { left: number; top: number; width: number; height: number };

export type MemoryCard = { value: string; meaning: string; icon: string };

const icon = (name: string) => `${F}/icon-${name}.svg`;

export const memories: Record<string, MemoryCard> = {
  two: { value: "2", meaning: "Hearts Becoming One", icon: icon("heart") },
  us: { value: "Us", meaning: "Starts Here", icon: icon("sparkles") },
  three: { value: "3", meaning: "Beautiful Gatherings", icon: icon("wine") },
  infinity: { value: "∞", meaning: "Memories to Make", icon: icon("camera") },
  vow: { value: "Vow", meaning: "For a Lifetime", icon: icon("flower") },
  you: { value: "You", meaning: "Our Favorite People", icon: icon("users") },
};

export const storyChapters: {
  year: string;
  title: string;
  copy: string;
  image: string;
  crop: Crop;
  mobileCrop: Crop;
  position: number;
}[] = [
  {
    year: "2016",
    title: "The Day We Met",
    copy: "It all began with a simple meeting in 2016. Little did we know that this ordinary moment would become the beginning of a story that life would beautifully bring back to us.",
    image: `${P}/story-2016.jpg`,
    crop: { left: -1.1, top: -18.29, width: 103.93, height: 268.9 },
    mobileCrop: { left: -0.99, top: -17.98, width: 102.65, height: 261.24 },
    position: 161.25 / 660,
  },
  {
    year: "2026",
    title: "The Celebration",
    copy: "Ten years after our first meeting, life brought us back to each other. What began as a simple hello had grown into something far more meaningful — a connection worth choosing, a love worth waiting for.",
    image: `${P}/story-2026.jpg`,
    crop: { left: -0.46, top: -46.34, width: 102.47, height: 265.85 },
    mobileCrop: { left: -0.99, top: -45.51, width: 102.65, height: 261.24 },
    position: 498.65 / 660,
  },
];

export const itineraryStops: {
  number: string;
  title: string;
  copy: string;
  details: { label: string; value: string }[];
  image: string;
  crop?: Crop;
  mobileCrop?: Crop;
}[] = [
  {
    number: "01",
    title: "The Venue",
    copy: "Join us this evening at St. Joseph Syro Malabar Church, Punnakunnam, as we exchange our vows before God, followed by dinner with our family and friends.",
    details: [
      { label: "Doors Open", value: "3:30 pm" },
      { label: "Location", value: "St. Joseph Syro Malabar Church, Punnakunnam" },
      { label: "Parking", value: "Available" },
    ],
    image: `${F}/day-church.png`,
    crop: { left: -0.85, top: -17.88, width: 101.76, height: 180.38 },
    mobileCrop: { left: -0.99, top: -16.45, width: 101.99, height: 166.45 },
  },
  {
    number: "02",
    title: "Ceremony Begins",
    copy: "Join us as we exchange heartfelt vows and begin a beautiful new chapter, surrounded by the people we love most in the world.",
    details: [
      { label: "Ceremony", value: "4:00 pm" },
      { label: "Reception", value: "6:30 pm" },
    ],
    image: `${F}/day-ceremony.png`,
  },
];

type Scattered = {
  /** Box position in px within the section; negative/right anchors keep edge bleed. */
  style: CSSProperties;
  src: string;
};

const side = (n: number) => `${P}/side-${n}.jpg`;

/** Figma "Scattered wedding photograph" slots (1440×846 frame); right-side slots are anchored to the right edge. */
export const scatteredDesktop: Scattered[] = [
  { style: { left: 184.46, top: 118, width: 136.55, height: 172.48, borderRadius: 16.64 }, src: side(1) },
  { style: { right: 201.69, top: 0, width: 181.87, height: 163, borderRadius: 23.83 }, src: side(4) },
  { style: { left: 230, top: 728, width: 181.87, height: 163, borderRadius: 23.83 }, src: side(2) },
  { style: { right: 228.04, top: 407, width: 174.96, height: 224.48, borderRadius: 22.93 }, src: side(5) },
  { style: { left: 0, top: 271.31, width: 152.12, height: 220.39, borderRadius: 16.64 }, src: side(6) },
  { style: { right: 0, top: 89.92, width: 170.85, height: 244.08, borderRadius: 17.84 }, src: side(7) },
  { style: { right: -5.65, top: 662, width: 193.93, height: 183.72, borderRadius: 20.25 }, src: side(3) },
  { style: { left: 24, top: 540, width: 140, height: 172, borderRadius: 16.64 }, src: side(8) },
];

/** Figma mobile slots (390×640 frame); right-side slots are anchored to the right edge. */
export const scatteredMobile: Scattered[] = [
  { style: { left: 24, top: 30, width: 66, height: 85, borderRadius: 12 }, src: side(1) },
  { style: { right: 44, top: 0, width: 86, height: 77, borderRadius: 12 }, src: side(4) },
  { style: { right: -10, top: 115, width: 70, height: 100, borderRadius: 12 }, src: side(7) },
  { style: { left: -24, top: 225, width: 76, height: 110, borderRadius: 12 }, src: side(6) },
  { style: { right: -2, top: 386, width: 80, height: 103, borderRadius: 12 }, src: side(5) },
  { style: { left: 36, top: 544, width: 90, height: 81, borderRadius: 12 }, src: side(2) },
  { style: { right: -10, top: 560, width: 100, height: 95, borderRadius: 12 }, src: side(3) },
];

/** Hero photo placement in the 390×720 mobile frame. */
export const heroMobileCrop: Crop = { left: -80.26, top: 0, width: 286.15, height: 103.2 };

/** Scratch cover crop of the sprite, relative to the date card. */
export const scratchCoverCrop: Crop = { left: -256.92, top: -180, width: 615.38, height: 470.4 };

export const heartCrop: Crop = { left: -15.9, top: -43.85, width: 125.01, height: 187.56 };
