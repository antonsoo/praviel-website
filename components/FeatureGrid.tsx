import FeatureGridContent from "@/components/FeatureGridContent";

const FEATURE_HEADING_ID = "features-title";
const FEATURE_DESCRIPTION_ID = "features-description";

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="relative z-10 px-6 py-16 sm:py-24 md:py-32"
      aria-labelledby={FEATURE_HEADING_ID}
      aria-describedby={FEATURE_DESCRIPTION_ID}
    >
      <FeatureGridContent headingId={FEATURE_HEADING_ID} descriptionId={FEATURE_DESCRIPTION_ID} />
    </section>
  );
}
