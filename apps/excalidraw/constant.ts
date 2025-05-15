export const theme = {
  orangeColor: "#FB7B59",
  black: "#000",
  white: "#fff",
  gray: "#737373",
  bg: "#0F0F11",
} as const;

interface keyFeaturesProps {
  label: string;
  content: string;
}

export const keyFeatures: keyFeaturesProps[] = [
  {
    label: "real-time collaboration",
    content:
      "work together with your team in real-time, seeing changes as they happen",
  },
  {
    label: "hand-drawn style",
    content: "create beautiful sketchy diagrams that look natural and engaging",
  },
  {
    label: "simple interface",
    content: "focus on your ideas with our clean, distraction-free interface",
  },
];
