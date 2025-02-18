import { useThemeStyled } from "@/hooks/useThemed";
import { RocketIcon } from "@/components/svgs/rocketIcon";
import { CardsCustom } from "@/components/cards/card";
import {
  Button,
  ButtonText,
  Container,
  InputContainer,
  StyledInput,
  SubTitle,
  Title,
} from "./style";
import { ButtonBackNavigateCustom } from "@/components/buttons/backNavigate/buttonBackNavigate";
import useAsyncStorageclass from "@/hooks/useAsyncStorageClass";
import { darkTheme, lightTheme } from "@/constants/Colors";
import { useState } from "react";
import { useToast } from "@/contexts/Toast/ToastContext";
import CreateClassIcon from "@/components/svgs/createClassIcon";

export const CreateClass = () => {
  const { isDarkMode } = useThemeStyled();
  const [inputClass, setInputClass] = useState("");
  const { addToast } = useToast();
  const { storedValue, saveValue, removeAllValues, onError, loadValue } =
    useAsyncStorageclass("turma", []);

  return (
    <Container>
      <ButtonBackNavigateCustom />
      <CreateClassIcon />
      <Title style={{ marginTop: 15 }}>Nova Turma</Title>
      <SubTitle>crie uma turma para adicionar pessoas</SubTitle>
      <InputContainer>
        <StyledInput
          onChangeText={(text) => setInputClass(text)}
          value={inputClass}
          placeholderTextColor={
            isDarkMode ? darkTheme.colors.text : lightTheme.colors.text
          }
          placeholder="Nome da turma"
        ></StyledInput>
      </InputContainer>
      {/* <Button onPress={() => console.log(storedValue)}>
        <ButtonText>recuperar dados</ButtonText>
      </Button> */}
      <Button
        onPress={() => {
          saveValue(inputClass);
        }}
      >
        <ButtonText>Criar</ButtonText>
      </Button>
      {/* <Button onPress={() => removeAllValues()}>
        <ButtonText>Remover dados</ButtonText>
      </Button> */}
      {/* <Button
        onPress={() =>
          addToast({ message: "Turma criada com sucesso", type: "success" })
        }
      >
        <ButtonText>{onError ? "true" : "false"}</ButtonText>
      </Button> */}
    </Container>
  );
};
