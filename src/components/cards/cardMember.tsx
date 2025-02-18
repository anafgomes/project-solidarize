// src/components/CardsCustom.tsx
import { CardsCustomProps } from "@/@types/CardsCustomProps";
import React from "react";
import { View, ViewStyle, StyleProp, DimensionValue } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, ContainerCard, IconExclude } from "./style";
import GroupIcon from "../svgs/groupIcon";
import { useRouter } from "expo-router";
import { PeopleType } from "@/@types/MemberType";
import ExcludeIcon from "../svgs/excludeIcon";

export const CardsCustomMember: React.FC<CardsCustomProps> = ({
  width,
  height,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  data,
  Icon,
  onPress,
  timeSelected,
}) => {
  return (
    <ScrollView
      style={{
        width: width ? width : "100%",
        marginTop: marginTop ? marginTop : 0,
        marginLeft: marginLeft ? marginLeft : 0,
        marginRight: marginRight ? marginRight : 0,
        marginBottom: marginBottom ? marginBottom : 0,
      }}
    >
      {data?.map((item: PeopleType, index: number) => (
        <ContainerCard key={index}>
          {Icon ? <Icon /> : <GroupIcon></GroupIcon>}
          <Text>{item.name}</Text>
          <IconExclude
            onPress={() => {
              if (onPress && timeSelected) {
                console.log(item.name, timeSelected);
                onPress(item.name, timeSelected);
              }
            }}
          >
            <ExcludeIcon />
          </IconExclude>
        </ContainerCard>
      ))}
    </ScrollView>
  );
};
