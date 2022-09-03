import { Box, chakra, Icon, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { GradientButton } from "../common/GradientButton";

interface IRatingInput {
  size: number,
  scale: number,
  fillColor: string,
  strokeColor: string,
  prodId: string,
  updateRating: ({ id, rating, comment }: {
    id: string;
    rating: number;
    comment: string;
    e: any;
  }) => Promise<void>
}

export const RatingInput = React.forwardRef(
  ({ size, scale, fillColor, strokeColor, updateRating, prodId } : IRatingInput, ref) => {
    const [rating, setRating] = useState<{rating: number, comment: string}>({ rating: 0, comment: ''})
    const buttons = [];

    const onClickRatingButton = (idx: number) => {
      if (idx === rating?.rating){
        console.log(idx)
        setRating({...rating, rating: 0 });
      }
      setRating({...rating, rating: idx });
    };

    const RatingIcon = ({idx, fill}:{idx: number, fill:boolean}) => {
      if (fill) {
        return(
          <Icon
            as={BsStarFill}
            color={fillColor}
            stroke={strokeColor}
            onClick={()=>onClickRatingButton(idx)}
          />
        )
      }
      
      return (
        <Icon
          as={BsStar}
          name={'star'}
          color={fillColor}
          stroke={strokeColor}
          onClick={()=>onClickRatingButton(idx)}
        />
      );
    };

    const RatingButton = ({ idx, fill } : {idx: number, fill: boolean}) => {
      return (
        <Box
          as="button"
          aria-label={`Rate ${idx}`}
          height={`${size}px`}
          width={`${size}px`}
          mx={1}
          onClick={() => onClickRatingButton(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} idx={idx}/>
        </Box>
      );
    };
    

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i<=rating.rating} />)
    }

    return (
      <form onSubmit={(e)=>updateRating({id: prodId,comment: rating.comment, rating: rating.rating, e})}>
        <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
          <Textarea width={{base: 'full', md: '180%'}} mt={8} placeholder={'Enter comment'} onChange={(e)=> setRating({...rating, comment: e.target.value})}/>
        </Box>
        <Stack isInline mt={4} mb={1} justify="center">
          <input name="rating" type="hidden" value={rating.rating}/>
          {buttons}
        </Stack>
        <Box width={`full`} textAlign="center" mb={2}>
            <Text fontSize="md" textTransform="uppercase">
              Rating: <Text as={chakra.span} fontWeight={'bold'}>{rating.rating}</Text>
            </Text>
        </Box>
        <Box display={'flex'} flexDir={'row'} justifyContent={'center'}>
          <GradientButton type={'submit'} buttonType='green' justifySelf={'center'}>Submit</GradientButton>
        </Box>
      </form>
    );
  }
);