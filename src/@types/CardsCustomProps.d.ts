export type CardsCustomProps = {
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  marginTop?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  data?: MemberType;
  Icon?: React.ElementType;
  onPress?: (value: any, teamNumber: "team1" | "team2") => Promise<void>;
  timeSelected?: "team1" | "team2";
};
