import type { CSSProperties } from "react";

import FeatureGridContent from "@/components/FeatureGridContent";

const FEATURE_HEADING_ID = "features-title";
const FEATURE_DESCRIPTION_ID = "features-description";
const deferredSectionStyle: CSSProperties = {
  contentVisibility: "auto",
  containIntrinsicSize: "1200px",
};

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="relative z-10 px-6 py-16 sm:py-24 md:py-32"
      aria-labelledby={FEATURE_HEADING_ID}
      aria-describedby={FEATURE_DESCRIPTION_ID}
      style={deferredSectionStyle}
    >
      <FeatureGridContent headingId={FEATURE_HEADING_ID} descriptionId={FEATURE_DESCRIPTION_ID} />
    </section>
  );
}
