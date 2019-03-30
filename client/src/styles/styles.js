export const fonts = {
  regular: 'Acre-Medium'
  // bold: 'Open Sans Bold'
}

export const fontSizes = {
  title: 32,
  subTitle: 22,
  regular: 14
}

export const spaces = {
  narrow: 10,
  medium: 14,
  wide: 22
}

export const palette = {
  primaryColor: '#ff4500',
  accentColor: '#00eaff',
  darkBackgroundColor: '#1f1f1f',
  BackgroundColor: '#fff',
  text: '#333333',
  darkText: '#d3d3d3',
  darkTextSecundary: '#808080'
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
}
