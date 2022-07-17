const colors = new (class {
  // RGB color
  blueDefault = 'rgb(42, 148, 254)';

  greyDot = '#E6ECEE';

  blue = 'rgba(0, 0, 255, 1)';

  mainBlueOpacity = 'rgba(51, 131, 249, 0.1)';

  grayLight = 'rgb(229, 229, 229)';

  grayBorder = 'rgb(168,168,168)';

  textGray = 'rgba(84, 84, 84, 1)';

  gray = 'rgba(128, 128, 128, 1)';

  grayOpacity = 'rgba(8, 27, 52, 0.7)';

  white = 'rgba(255, 255, 255, 1)';

  black = 'rgba(0, 0, 0, 1)';

  colorBlackTranparent = 'rgba(0, 0, 0, 0)';

  textBlackColor = 'rgb(50, 50, 50)';

  red = 'rgba(255, 0, 0, 1)';

  yellow = 'rgba(255, 255, 0, 1)';

  green = 'rgba(0, 128, 0, 1)';

  backgroundColor = 'rgba(73, 175, 241, 1)';

  blueRGBAA73F0 = 'rgba(10, 115, 240, 0.1)';

  whiteWithOpacity = (opacity = 1) => `rgba(255, 255, 255, ${opacity})`;

  blackWithOpacity = (opacity = 1) => `rgba(0, 0, 0, ${opacity})`;

  textGrayWithOpacity = (opacity = 1) => `rgba(84, 84, 84, ${opacity})`;

  bluePrimaryRGBWithOpacity = (opacity = 1) => `rgba(51,131,249,${opacity})`;

  blueWithOpacity = (opacity = 1) => `rgba(57, 169, 238, ${opacity})`;

  redWithOpacity = (opacity = 1) => `rgba(255, 0, 0, ${opacity})`;

  grayWithOpacity = (opacity = 1) => `rgba(128, 128, 128, ${opacity})`;

  greenWithOpacity = (opacity = 1) => `rgba(0, 128, 0, ${opacity})`;

  colorsF7484A = (opacity = 1) => `rgba(247, 72, 74, ${opacity})`;

  greenOpacity = (opacity = 1) => `rgba(17, 201, 105, ${opacity})`;

  redOpacity = (opacity = 1) => `rgba(247, 72, 74, ${opacity})`;

  yellowOpacity = (opacity = 1) => `rgba(255, 194, 10, ${opacity})`;

  blackDefaultTextWithOpacity = (opacity = 1) => `rgba(11, 25, 45, ${opacity})`;

  blackMainWithOpacity = (opacity = 1) => `rgba(10, 40, 81, ${opacity})`;

  // Hex color

  colorHeader = '#F8FBFF';

  black0A2851 = '#0A2851';

  gray7A8AA2 = '#7A8AA2';

  blue0A73F0 = '#0A73F0';

  purple582E91 = '#582E91';

  gray828282 = '#828282';

  purpleF6F0FF = '#F6F0FF';

  bgColorRating = '#00000060';

  blackDefaultText = '#0B192D';

  blackDefaultTextBlur = (opacity = 0.1) => `rgba(11, 25, 45, ${opacity})`;

  bluePrimary = '#3383F9';

  grayOTP = '#E8EBF0';

  colorInputPrimary = '#2257e9';

  colorInputBasic = '#646464';

  colorInputBasicBg = '#f4f4f4';

  colorInputError = '#ff1a12';

  colorGrayDDDDDD = '#DDDDDD';

  colorGray555555 = '#555555';

  grayBFC2D0 = '#BFC2D0';

  textLabelColor = '#6B6E87';

  bottomTabDivider = '#F6F7FB';

  yellowFFC20A = '#FFC20A';

  divider = '#E7E9F2';

  warningColor = '#FF4858';

  successColor = '#5FBD4B';

  grayD6D9E0 = '#D6D9E0';

  lightblueD8E4FA = '#D8E4FA';

  grayE7E9EF = '#E7E9EF';

  grayF2F2F2 = '#F2F2F2';

  D0ECF5 = '#D0ECF5';

  E9E7F7 = '#E9E7F7';

  FAEBE8 = '#FAEBE8';

  E2F6F5 = '#E2F6F5';

  grayF3F5FA = '#F3F5FA';

  grayEFF3F4 = '#EFF3F4';

  FEFFFF = '#FEFFFF';

  F1F2F3 = '#F1F2F3';

  redF7484A = '#F7484A';

  lightBlueEEF5FF = '#EEF5FF';

  gray878B96 = '#878B96';

  grayF6F6F8 = '#F6F6F8';

  yellowFFA70A = '#FFA70A';

  colorF6EBEF = '#F6EBEF';

  grayD4D7DC = '#D4D7DC';

  colorGrayD3D6E2 = '#D3D6E2';

  colorGreen1CCE70 = '#1CCE70';

  green11C969 = '#11C969';

  loadingIndicator = '#0074ff';

  gray4E5B6C = '#4E5B6C';

  blue6FE0DB = '#6FE0DB';

  grayF9FAFC = '#F9FAFC';

  black061D3C = '#061D3C';

  grayD1D4E1 = '#D1D4E1';

  redFF0000 = '#ff0000';

  pinkF5E4E8 = '#F5E4E8';

  blueText3383F9 = '#3383F9';

  blackText505864 = '#505864';

  grayD8D8D8 = '#D8D8D8';

  greyC4C4C4 = '#C4C4C4';

  greyF1F2F5 = '#F1F2F5';

  text464F5C = '#464F5C';

  greyEEEFF1 = '#EEEFF1';

  green8DD9D5 = '#8DD9D5';

  textYellowFFAC18 = '#FFAC18';

  mainBlue = '#0073FF';

  transparent = 'transparent';

  grey6C7E98 = '#6C7E98';

  border9EAABB = '#9EAABB';

  greyF6F7F9 = '#F6F7F9';

  originalBlack = '#000000';

  grey6B7D97 = '#6B7D97';

  text536885 = '#536885';

  greyC6CBD4 = '#C6CBD4';

  greyF4F7FA = '#F4F7FA';

  greyDCDCDC = '#DCDCDC';

  blurblue = '#E7F1FD';

  blurblue2 = '#E7F2F9';

  phoneBg = '#E0E6EE';

  redFF5561 = '#FF5561';
})();

export default colors;
