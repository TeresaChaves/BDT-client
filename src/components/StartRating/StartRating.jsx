import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

function StartRating({ rating }) {
  const fullStars = Math.floor(rating); // Estrellas completas
  const hasHalfStar = rating % 1 > 0; // ¿Hay media estrella?
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <>
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} color="gold" />
        ))}

        {hasHalfStar && <FaStarHalfAlt key="half" color="gold" />}

        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} color="gray" />
        ))}
      </div>
    </>
  );
}
export default StartRating;
