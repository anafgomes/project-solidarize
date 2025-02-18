import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ExcludeIcon = (props: any) => (
  <Svg
    width={54}
    height={54}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.607 23.335a.75.75 0 0 1 0-1.061l11.667-11.667a.75.75 0 1 1 1.06 1.06L11.667 23.334a.75.75 0 0 1-1.06 0"
      fill="#F75A68"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.607 10.607a.75.75 0 0 1 1.06 0l11.667 11.667a.75.75 0 0 1-1.06 1.06L10.607 11.668a.75.75 0 0 1 0-1.06"
      fill="#F75A68"
    />
  </Svg>
);
export default ExcludeIcon;
