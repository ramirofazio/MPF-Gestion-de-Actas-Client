export function CardElement({ title, value, className }) {
  return (
    <div className={`cardInfoContainer ${className}`}>
      <span className="cardTitle capitalize">{title}</span>
      <br />
      {value}
    </div>
  );
}
