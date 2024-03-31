import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import z, { TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";

const schema = z.object({
  options: z.object({
    drink: z.boolean(),
    potato: z.boolean(),
  }),
  types: z.object({
    drink: z
      .object({
        size: z.string(),
        flavor: z.string(),
      })
      .optional(),
    potato: z
      .object({
        size: z.string(),
        flavor: z.string(),
      })
      .optional(),
  }),
});

type FormData = TypeOf<typeof schema>;

const FormExample = () => {
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [formData, setFormData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setFormData(data);
  };

  const optionsValue = useWatch({ name: "options", control });
  const optionsValueArray = useMemo(() => {
    return Object.entries(optionsValue ?? {}).flatMap(([key, value]) => {
      if (!value) return [];
      return [key] as any;
    });
  }, [optionsValue]);

  return (
    <div>
      <DevTool control={control} placement="top-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="options"
          control={control}
          defaultValue={{ drink: false, potato: false }}
          render={({ field }) => {
            return (
              <FormControl mt={4}>
                <Checkbox
                  id="options.drink"
                  checked={field.value.drink}
                  onChange={(e) =>
                    field.onChange({ ...field.value, drink: e.target.checked })
                  }
                >
                  drink
                </Checkbox>
                <Checkbox
                  id="options.potato"
                  checked={field.value.potato}
                  onChange={(e) =>
                    field.onChange({ ...field.value, potato: e.target.checked })
                  }
                >
                  potato
                </Checkbox>
              </FormControl>
            );
          }}
        />

        <Controller
          name="types"
          control={control}
          defaultValue={{}}
          render={({ field }) => {
            return (
              <Type
                options={optionsValueArray}
                value={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />
        <Button mt={4} colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>

      {formData && (
        <div>
          <h2>Form Data</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

type ValueType = {
  [option in "drink" | "potato"]?: { size: string; flavor: string };
};

type TypeProps = {
  options: ("drink" | "potato")[];
  value: ValueType;
  onChange: (value: ValueType) => void;
};
const Type: React.FC<TypeProps> = ({ options, value, onChange }) => {
  useEffect(() => {
    const newValue = options.reduce<ValueType>((prev, current) => {
      return { ...prev, [current]: value[current] };
    }, {});
    onChange(newValue);
  }, [options]);

  return (
    <>
      {options.map((option) => {
        return (
          <FormControl key={option}>
            <p>{option}</p>
            <FormLabel htmlFor={`${option}-size`}>Size</FormLabel>
            <Input
              id={`${option}-size`}
              type="text"
              value={value[option]?.size ?? ""}
              onChange={(e) =>
                onChange({
                  ...value,
                  [option]: { ...value[option], size: e.target.value },
                })
              }
            />
            <FormLabel htmlFor={`${option}-flavor`}>Flavor</FormLabel>
            <Input
              id={`${option}-flavor`}
              type="text"
              value={value[option]?.flavor ?? ""}
              onChange={(e) =>
                onChange({
                  ...value,
                  [option]: { ...value[option], flavor: e.target.value },
                })
              }
            />
          </FormControl>
        );
      })}
    </>
  );
};

export const Route = createFileRoute("/dynamic-field2")({
  component: () => <FormExample />,
});
