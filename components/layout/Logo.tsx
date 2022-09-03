import { 
  Box, 
  Text, 
  useColorModeValue 
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import { logo } from "../../assets";
import { darkGradient, lightGradient } from "../../constants";


interface ILogo {
  plBase?: number;
  plMd?:number;
  pxBase?: number;
  pyBase?: number;
  pyMd?: number;
  fontSm?: string;
  fontMd?: string;
  fontLg?: string;
  fontFamily: string;
  fontWeight?: string;
  hoverGradient?: boolean;
  onClose?: () => void;
}

export const Logo: React.FC<ILogo> = ({plBase, pyBase, pxBase, pyMd, plMd, fontSm, fontMd, fontLg, fontFamily, fontWeight='semibold', hoverGradient=false, onClose}:ILogo) => (
  <Link href={'/'}>
    <Box 
      display={'flex'}
      flexDir={'row'}
      w={'fit-content'}
      borderRadius={'lg'}
      onClick={onClose}
      px={{base: pxBase, md:0 }}
      py={{base: pyBase, md: pyMd}}
      pl={{base: plBase, md: plMd}}
      pr={1}
      justifyContent={'center'}
      alignItems={'center'}
      userSelect={'none'}
      _hover={{ 
        textDecoration: 'none',
        cursor: 'pointer',
        bgGradient: hoverGradient === true ? useColorModeValue(lightGradient, darkGradient) : undefined,
      }}>
      <Box w={8} h={8} mr={1} userSelect={'none'}>
        <Image src={logo}/>
      </Box>
      {/* <Box display={{base:'inherit', md:'inherit'}} minW={{base: 'full', md:'fit-content'}}> */}
        <Text
          pt={{base: 1, md:1}}
          pr={2}
          pl={1}
          textAlign={'left'}
          fontFamily={fontFamily}
          fontSize={{base: fontSm, md: fontMd, lg: fontLg}}
          fontWeight={fontWeight}
          noOfLines={1}
          textDecoration={'unset'}
          color={useColorModeValue('gray.800','white')}
        >
          eShop
        </Text>
      {/* </Box> */}
    </Box>
  </Link>
)