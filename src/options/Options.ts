import prompts from "prompts";
import { OptionsScript } from "../types/scripts";

const confirm = async (message: string): Promise<boolean | undefined> => {
  const { value } = await prompts<"value">({
    type: "confirm",
    name: "value",
    message: message ?? "Select the correct option",
  });

  return value;
};
const select = async <T>(choices: OptionsScript): Promise<T[]> => {
  const { value } = await prompts<"value">({
    type: choices.multipleSelection ? "multiselect" : "select",
    name: "value",
    message: choices.message ?? "Select the correct option",
    instructions: false,
    choices: choices.options.map((op: any) => ({
      title: op.name ?? "",
      description: op.message,
      value: op.payload,
      selected: op.defaultCheck ?? false,
    })),
    initial: 0,
  });

  return Array.isArray(value) ? value : [value];
};

export const options = {
  select,
  confirm,
};
