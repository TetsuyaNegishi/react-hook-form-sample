import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import z, { type TypeOf } from "zod";

const schema = z.object({
  options: z.object({
    drink: z.boolean(),
    potato: z.boolean(),
  }),
  types: z
    .array(
      z.object({
        size: z.string(),
        flavor: z.string(),
      }),
    )
    .optional(),
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

        {Object.entries(optionsValue ?? []).map(([key, value], index) => {
          if (!value) {
            return null;
          }
          return (
            <Controller
              key={key}
              name={`types.${index}`}
              control={control}
              defaultValue={{ size: "", flavor: "" }}
              render={({ field, fieldState: { error } }) => {
                console.log({ field });
                return (
                  <>
                    <FormControl>
                      <p>{key}</p>
                      <FormLabel htmlFor="size">Size</FormLabel>
                      <Input
                        id="size"
                        type="text"
                        value={field.value.size}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            size: e.target.value,
                          })
                        }
                      />
                      <FormLabel htmlFor="flavor">Flavor</FormLabel>
                      <Input
                        id="flavor"
                        type="text"
                        value={field.value.flavor}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            flavor: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </>
                );
              }}
            />
          );
        })}

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

export const Route = createFileRoute("/dynamic-field")({
  component: () => <FormExample />,
});
