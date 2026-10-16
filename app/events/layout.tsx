import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | RTF",
  description:
    "Special events and celebrations from the Road To Freedom Group in Carrollton, GA.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
