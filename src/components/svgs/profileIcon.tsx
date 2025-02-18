import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ProfileIcon = (props: any) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.703 12.14Q6.47 11.017 9 11.017q2.532 0 5.25 1.125 2.766 1.078 2.766 2.859v2.016H.984V15q0-1.78 2.72-2.86m8.11-4.312Q10.64 9 9 9T6.188 7.828 5.016 5.016t1.172-2.813Q7.358.985 9 .984q1.64 0 2.813 1.22 1.17 1.17 1.171 2.812 0 1.64-1.171 2.812"
      fill="#C4C4CC"
    />
  </Svg>
);
export default ProfileIcon;
