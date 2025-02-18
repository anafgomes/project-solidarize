import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClassType } from "@/@types/ClassType";
import { useToast } from "@/contexts/Toast/ToastContext";
import { MemberType, PeopleType } from "@/@types/MemberType";

const useAsyncStorageMember = (key: any, initialValue: any) => {
  const [storedValueMenber, setStoredValue] = useState(initialValue);
  const [onUpdateMenber, setUpdate] = useState(false);
  const [onErrorMenber, setOnError] = useState(false);
  const { addToast } = useToast();

  const saveValueMenber = useCallback(
    async (value: any, teamNumber: "team1" | "team2") => {
      try {
        if (value.length === 0) {
          addToast({ message: "Digite um nome válido", type: "error" });
          return false;
        }
        const MenberString = await AsyncStorage.getItem(key);
        if (!MenberString) {
          const newArray: MemberType = { team1: [], team2: [] };
          newArray[teamNumber].push({ name: value });
          const jsonValue = JSON.stringify(newArray);
          await AsyncStorage.setItem(key, jsonValue);
          setStoredValue(newArray);
          addToast({
            message: "Membro adicionado com sucesso",
            type: "success",
          });
          return true;
        }
        const ConvertToJson: MemberType = JSON.parse(MenberString);
        ConvertToJson[teamNumber].map((item: PeopleType) => {
          if (item.name == value) {
            setOnError(true);
            setTimeout(() => setOnError(false), 3000);
            addToast({
              message: "Esse menbro já está cadastrado!",
              type: "loading",
            });
            throw new Error("item ja existe");
          }
        });
        ConvertToJson[teamNumber].push({ name: value });
        const jsonValue = JSON.stringify(ConvertToJson);
        await AsyncStorage.setItem(key, jsonValue);
        setStoredValue(ConvertToJson);
        addToast({ message: "Turma criada com sucesso", type: "success" });
        setUpdate((prev) => !prev);
        console.log(`Data saved to AsyncStorage with key: ${key}`);
      } catch (error) {
        console.error(
          `Error saving data to AsyncStorage with key: ${key}`,
          error,
        );
      }
    },
    [key],
  );

  const loadValueMenber = useCallback(async () => {
    try {
      console.log("foi chamado loadValue");
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        const parsedValue = JSON.parse(jsonValue);
        setStoredValue(parsedValue);
        console.log(`Data loaded from AsyncStorage with key: ${key}`);
      }
    } catch (error) {
      console.error(
        `Error loading data from AsyncStorage with key: ${key}`,
        error,
      );
    }
  }, [key]);

  const removeOneValueMenber = useCallback(
    async (value: any, teamNumber: "team1" | "team2") => {
      try {
        const MenberString = await AsyncStorage.getItem(key);
        if (!MenberString) {
          setOnError(!onErrorMenber);
          setTimeout(() => setOnError(!onErrorMenber), 3000);
          throw new Error("erros ao buscar dados");
        }
        const ConvertedToJson: MemberType = JSON.parse(MenberString);
        ConvertedToJson[teamNumber] = ConvertedToJson[teamNumber].filter(
          (item: PeopleType) => item.name !== value,
        );
        const newArrayConverted = JSON.stringify(ConvertedToJson);
        await AsyncStorage.setItem(key, newArrayConverted);
        addToast({ message: "Menbro apagado com sucesso", type: "success" });
        setStoredValue(ConvertedToJson);
        console.log(`Data removed from AsyncStorage with key: ${value}`);
      } catch (error) {
        console.error(
          `Error removing data from AsyncStorage with key: ${value}`,
          error,
        );
      }
    },
    [key],
  );

  const removeAllValuesMenber = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue([]);
      console.log(`Data removed from AsyncStorage with key: ${key}`);
    } catch (error) {
      console.error(
        `Error removing data from AsyncStorage with key: ${key}`,
        error,
      );
    }
  }, [key]);

  useEffect(() => {
    loadValueMenber();
  }, [loadValueMenber]);

  return {
    storedValueMenber,
    saveValueMenber,
    loadValueMenber,
    removeAllValuesMenber,
    removeOneValueMenber,
    onErrorMenber,
    onUpdateMenber,
  };
};

export default useAsyncStorageMember;
