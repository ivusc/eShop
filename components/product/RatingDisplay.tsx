import { Box, Icon } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface IRatingDisplay {
  rating: number;
  numReviews?: number;
  showNumReviews: boolean;
}

export const RatingDisplay : React.FC<IRatingDisplay> = ({ rating, numReviews, showNumReviews }) => {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating) / 2;
          if (roundedRating - i >= 1) {
            return (
              <Icon
                as = {BsStarFill}
                key={i}
                style={{ marginLeft: '1' }}
                size={15}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <Icon as={BsStarHalf} key={i} style={{ marginLeft: '1' }} size={15} />;
          }
          return <Icon as={BsStar} key={i} style={{ marginLeft: '1' }} size={15} />;
        })}
      {showNumReviews && (
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews!} review{numReviews! > 1 && 's'} | &nbsp;
          {Math.round(rating)} /10
        </Box>
      )}
    </Box>
  );
}