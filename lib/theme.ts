import { theme as origTheme, extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { mode,  } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  config:{
     initialColorMode: 'dark',
     useSystemColorMode: false,
  },
  fonts:{
    heading: 'Inter',
    body: 'Inter',
    mono: "Menlo, monospace",
  },
  colors:{
    transparent: 'transparent',
  },
  breakpoints: {
    'mdsm':'33em',
    'mdlg': '47.5em',
    '2xl': '96em',
  },
  components:{
    Heading: {
      variants: {
        'section-title': (props: StyleFunctionProps) => ({
          marginTop: 3,
          color: mode('blue.700','blue.300') (props),
        }),
        'subtitle': (props: StyleFunctionProps) => ({
          marginTop: 2,
          color: mode('indigo.700','indigo.100') (props),
        }),
      }
    },
    Drawer:{
      parts: ['dialog', 'header', 'body'],
      variants: {
        light: {
          dialog: {
            background: 'gray.50', 
          }
        },
        dark: {
          dialog: {
            background: 'gray.900',
          }
        }
      }
    },
  },
  styles: {
     global: (props:any) => ({
       body: {
        bg: mode('white', 'gray.900')(props)
       }
     })
  },
})