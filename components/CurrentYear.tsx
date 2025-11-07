const CURRENT_YEAR = new Date().getFullYear();

export default function CurrentYear() {
  return <span suppressHydrationWarning>{CURRENT_YEAR}</span>;
}
