import { Box, chakra, Icon, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { GradientButton } from "../common/GradientButton";

interface IRatingInput {
  size: number,
  scale: number,
  fillColor: string,
  strokeColor: string,
}

export const RatingInput = React.forwardRef(
  ({ size, scale, fillColor, strokeColor } : IRatingInput, ref) => {
    const [rating, setRating] = useState(0);
    const buttons = [];

    const onClickRatingButton = (idx: number) => {
      if (idx === rating){
        console.log(idx)
        setRating(0);
      }
      setRating(idx)
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
      buttons.push(<RatingButton key={i} idx={i} fill={i<=rating} />)
    }

    return (
      <form>
        <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
          <Textarea width={'90%'} mt={8} placeholder={'Enter comment'}/>
        </Box>
        <Stack isInline mt={4} mb={1} justify="center">
          <input name="rating" type="hidden" value={rating}/>
          {buttons}
        </Stack>
        <Box width={`full`} textAlign="center" mb={2}>
            <Text fontSize="md" textTransform="uppercase">
              Rating: <Text as={chakra.span} fontWeight={'bold'}>{rating}</Text>
            </Text>
        </Box>
        <Box display={'flex'} flexDir={'row'} justifyContent={'center'}>
          <GradientButton type={'submit'} buttonType='green' justifySelf={'center'}>Submit</GradientButton>
        </Box>
      </form>
    );
  }
);