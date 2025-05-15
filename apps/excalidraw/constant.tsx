import { RiGlobalLine } from "react-icons/ri";
import { ReactElement } from "react";
import { PiSketchLogo } from "react-icons/pi";
import { SiSimpleanalytics } from "react-icons/si";
import { SlPeople } from "react-icons/sl";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaRegCircleCheck } from "react-icons/fa6";

export const theme = {
  orangeColor: "#FB7B59",
  black: "#000",
  white: "#fff",
  gray: "#737373",
  bg: "#0F0F11",
} as const;

export interface HeadingWithIconAndCardProps {
  label: string;
  content: string;
  icon: ReactElement;
}

export const keyFeatures: HeadingWithIconAndCardProps[] = [
  {
    label: "real-time collaboration",
    content:
      "work together with your team in real-time, seeing changes as they happen",
    icon: <RiGlobalLine size={25} />,
  },
  {
    label: "hand-drawn style",
    content: "create beautiful sketchy diagrams that look natural and engaging",
    icon: <PiSketchLogo size={25} />,
  },
  {
    label: "simple interface",
    content: "focus on your ideas with our clean, distraction-free interface",
    icon: <SiSimpleanalytics size={25} />,
  },
];

export const howItWorks: HeadingWithIconAndCardProps[] = [
  {
    label: "create a room",
    content: "start by creating a new collaboration room with custom name.",
    icon: <SlPeople size={25} />,
  },
  {
    label: "invite colaborators",
    content: "share your room link with teammates for instant collaboration.",
    icon: <AiOutlineThunderbolt size={25} />,
  },
  {
    label: "draw together",
    content: "sketch, diagram and brainstrom together in realtime.",
    icon: <FaRegCircleCheck size={25} />,
  },
];

interface TestimonialsProps {
  content: string;
  label: string;
}

export const testimonials: TestimonialsProps[] = [
  {
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam dicta aliquam eveniet vel, suscipit cupiditate ex minus harum aut cumque ipsum dolor, veritatis debitis quos voluptas nobis explicabo! Natus, recusandae!",
    label: "sarah K., product designer",
  },
  {
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam dicta aliquam eveniet vel, suscipit cupiditate ex minus harum aut cumque ipsum dolor, veritatis debitis quos voluptas nobis explicabo! Natus, recusandae!",
    label: "michael T., UX researcher",
  },
];

interface FooterProps {
  label: string;
  content: string[];
}

export const footerProps: FooterProps[] = [
  {
    label: "product",
    content: ["features", "pricing", "FAQ"],
  },
  {
    label: "company",
    content: ["about", "blog", "contact"],
  },
];

export interface roomsProps {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  adminId: string;
}

export const rooms: roomsProps[] = [
  {
    id: 1,
    name: "this is my room",
    slug: "this-is-my-room",
    createdAt: "date",
    adminId: "admin",
  },
  {
    id: 2,
    name: "you waana fight with me",
    slug: "you-waana-fight-with-me",
    createdAt: "date",
    adminId: "admin",
  },
];
