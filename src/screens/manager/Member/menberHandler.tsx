import { useThemeStyled } from "@/hooks/useThemed";
import { RocketIcon } from "@/components/svgs/rocketIcon";
import { CardsCustom } from "@/components/cards/card";
import {
  Button,
  ButtonAdd,
  ButtonText,
  ButtonTime,
  Container,
  InputContainer,
  InputContainerTime,
  StyledInput,
  SubTitle,
  Title,
} from "./style";
import { ButtonBackNavigateCustom } from "@/components/buttons/backNavigate/buttonBackNavigate";
import useAsyncStorageclass from "@/hooks/useAsyncStorageClass";
import { darkTheme, lightTheme } from "@/constants/Colors";
import { useState } from "react";
import { useToast } from "@/contexts/Toast/ToastContext";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import useAsyncStorageMember from "@/hooks/useAsyncStorageMember";
import { Pressable } from "react-native";
import { CardsCustomMember } from "@/components/cards/cardMember";
import ProfileIcon from "@/components/svgs/profileIcon";

export const MenberHandler = () => {
  const { title } = useLocalSearchParams<{ title: string }>();
  const { isDarkMode } = useThemeStyled();
  const [inputMember, setInputClass] = useState("");
  const [timeSelected, setTimeSelected] = useState<"team1" | "team2">("team1");
  const { addToast } = useToast();
  const { removeOneValue } = useAsyncStorageclass("turma", []);

  const {
    storedValueMenber,
    saveValueMenber,
    removeOneValueMenber,
    removeAllValuesMenber,
  } = useAsyncStorageMember(title, []);

  return (
    <Container>
      <ButtonBackNavigateCustom />
      <RocketIcon />
      <Title style={{ marginTop: 15 }}>{title}</Title>
      <SubTitle>adicione a galera e separe os times</SubTitle>
      <InputContainer>
        <StyledInput
          onChangeText={(text: string) => setInputClass(text)}
          value={inputMember}
          placeholderTextColor={
            isDarkMode ? darkTheme.colors.text : lightTheme.colors.text
          }
          placeholder="Nome do participante"
        ></StyledInput>
        <ButtonAdd
          onPress={() => {
            saveValueMenber(inputMember, timeSelected);
          }}
        >
          <Entypo
            style={{ marginLeft: 1 }}
            name="plus"
            size={35}
            color="green"
          />
        </ButtonAdd>
      </InputContainer>
      <InputContainerTime>
        <ButtonTime
          onPress={() => setTimeSelected("team1")}
          border={timeSelected === "team1"}
        >
          <Title bold={true} fontSize={"15px"}>
            TIME A
          </Title>
        </ButtonTime>
        <ButtonTime
          onPress={() => setTimeSelected("team2")}
          border={timeSelected === "team2"}
        >
          <Title bold={true} fontSize={"15px"}>
            TIME B
          </Title>
        </ButtonTime>
      </InputContainerTime>
      <CardsCustomMember
        width={"90%"}
        data={storedValueMenber[timeSelected]}
        Icon={() => <ProfileIcon />}
        onPress={removeOneValueMenber}
        timeSelected={timeSelected}
      ></CardsCustomMember>
      <Button
        color={"#da2834"}
        onPress={async () => {
          await removeOneValue(title);
          await removeAllValuesMenber();
          router.push("/");
        }}
      >
        <ButtonText>Remover a turma</ButtonText>
      </Button>
      {/* <Pressable
        onPress={() => {
          console.log(storedValueMenber);
        }}
      >
        <ButtonText>Vizalizar dados</ButtonText>
      </Pressable> */}
    </Container>
  );
};
