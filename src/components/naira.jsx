export default function naira(amount) {
  return `₦${amount?.toLocaleString("en-NG")}`;
}