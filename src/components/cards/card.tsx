// src/components/CardsCustom.tsx
import { CardsCustomProps } from "@/@types/CardsCustomProps";
import React from "react";
import { View, ViewStyle, StyleProp, DimensionValue } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, ContainerCard } from "./style";
import GroupIcon from "../svgs/groupIcon";
import { useRouter } from "expo-router";

export const CardsCustom: React.FC<CardsCustomProps> = ({
  width,
  height,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  data,
  Icon,
}) => {
  const router = useRouter();

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
      {data?.map((item: any, index: string) => (
        <ContainerCard
          onPress={() =>
            router.push({
              pathname: "/class/editClass",
              params: { title: `${item.title}` },
            })
          }
          key={index}
        >
          <GroupIcon></GroupIcon>
          <Text>{item.title}</Text>
        </ContainerCard>
      ))}
    </ScrollView>
  );
};
