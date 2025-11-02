"use client";
import GlobalLoader from "../../components/GlobalLoader";

export default function Loading() {
  // Next will render this while route segments are loading (server components)
  return <GlobalLoader />;
}
