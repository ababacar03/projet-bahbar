import { AiFillStar, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

export default function RatingStars({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-2">
            {/* Note numérique */}
            <span className="text-[10px] font-medium text-gray-800">{rating.toFixed(1)} / 5</span>

            {/* Étoiles */}
            <div className="flex text-yellow-400 text-sm">
                {Array(fullStars).fill().map((_, i) => (
                    <AiFillStar key={`full-${i}`} />
                ))}
                {hasHalfStar && <AiTwotoneStar />}
                {Array(emptyStars).fill().map((_, i) => (
                    <AiOutlineStar key={`empty-${i}`} />
                ))}
            </div>
        </div>
    );
}
