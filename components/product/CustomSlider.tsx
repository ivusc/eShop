import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Tooltip, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { darkGradient, lightGradient } from "../../constants"

interface ICustomSlider{
  prodStock: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const CustomSlider : React.FC<ICustomSlider> = ({prodStock, quantity, setQuantity}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <Slider
      id='slider'
      defaultValue={1}
      min={1}
      max={prodStock}
      onChange={(v) => setQuantity(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={0.25*prodStock} mt='1' ml='-2.5' fontSize='sm'>
        {Math.round(0.25*prodStock)}
      </SliderMark>
      <SliderMark value={0.5*prodStock} mt='1' ml='-2.5' fontSize='sm'>
        {Math.round(0.5*prodStock)}
      </SliderMark>
      <SliderMark value={0.75*prodStock} mt='1' ml='-2.5' fontSize='sm'>
        {Math.round(0.75*prodStock)}
      </SliderMark>
      <SliderMark value={prodStock} mt='1' ml='-2.5' fontSize='sm'>
        {prodStock}
      </SliderMark>
      <SliderTrack >
        <SliderFilledTrack bgGradient={useColorModeValue(lightGradient, darkGradient)}/>
      </SliderTrack>
      <Tooltip
        hasArrow
        bgGradient={useColorModeValue(lightGradient, darkGradient)}
        color={useColorModeValue('white','gray.900')}
        placement='top'
        isOpen={showTooltip}
        label={`${quantity}`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  )
}