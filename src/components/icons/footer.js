import Svg, { G, Line, Path } from 'react-native-svg';

import React from 'react';

export default ({ width, height, style }) => (
  <Svg width={width || 96.4} height={height || 30} viewBox="0 0 96.4 30" fill="white" style={style}>
    <G>
      <Path d=" M 48.192 30 L -0.016 30 L -0.016 0 C 7.134 0 13.787 3.66 17.614 9.699 L 19.443 12.584 C 25.685 22.432 36.533 28.4 48.192 28.4 L 48.192 28.4 L 48.192 28.4 C 59.851 28.4 70.699 22.432 76.941 12.584 L 78.77 9.699 C 82.597 3.66 89.25 0 96.4 0 L 96.4 30 L 48.192 30 L 48.192 30 Z " stroke='#e7e7e7' strokeWidth="1" />
      <Line x1="0" y1="0" x2="0" y2="30" stroke="white" strokeWidth="1" />
      <Line x1="96.4" y1="0" x2="96.4" y2="30" stroke="white" strokeWidth="1" />
      <Line x1="0" y1="30" x2="96.4" y2="30" stroke="white" strokeWidth="1" />
    </G>
  </Svg>
)
