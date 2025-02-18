import * as React from "react";
import Svg, { G, Rect, Circle, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGIconCamera = (props: any) => (
  <Svg
    width={105}
    height={105}
    viewBox="0 0 105 105"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_2_29)">
      <Rect
        x={20}
        y={20}
        width={64.8613}
        height={64.8613}
        rx={19.9573}
        fill="#E14848"
      />
    </G>
    <Rect
      x={31}
      y={39.9574}
      width={42.4093}
      height={29.936}
      rx={7.484}
      fill="white"
    />
    <Circle
      cx={51.581}
      cy={54.3017}
      r={8.73133}
      stroke="#E14848"
      strokeWidth={1.24733}
    />
    <Path
      d="M38.484 39.9574C38.484 39.2685 39.0424 38.71 39.7313 38.71H43.4733C44.1622 38.71 44.7207 39.2685 44.7207 39.9574H38.484Z"
      fill="#FFFCFC"
    />
    <Path
      d="M57.194 38.7101C57.194 37.3323 58.3109 36.2154 59.6887 36.2154H64.678C66.0558 36.2154 67.1727 37.3323 67.1727 38.7101V41.2047H57.194V38.7101Z"
      fill="#FFFCFC"
    />
    <Defs></Defs>
  </Svg>
);
export default SVGIconCamera;
