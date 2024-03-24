import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import z, { TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Checkbox,
} from "@chakra-ui/react";

const schema = z.object({
  options: z.object({
    drink: z.boolean(),
    potato: z.boolean(),
  }),
  potato: z
    .object({
      size: z.string().min(2),
    })
    .optional(),
});

type FormData = TypeOf<typeof schema>;

const FormExample = () => {
  const {
    handleSubmit,
    control
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [formData, setFormData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setFormData(data);
  };

  const potatoValue = useWatch({name: "options.potato", control})

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="options"
          control={control}
          defaultValue={{drink: false, potato: false}}
          render={({field}) => {
            return (
              <FormControl mt={4}>
                <Checkbox id="options.drink" checked={field.value.drink} onChange={(e) => field.onChange({...field.value, drink: e.target.checked})}>
                  drink
                </Checkbox>
                <Checkbox
                  id="options.potato"
                  checked={field.value.potato}
                  onChange={(e) => field.onChange({...field.value, potato: e.target.checked})}
                >
                  potato
                </Checkbox>

              </FormControl>
            );
          }}
        />

        {potatoValue && (
          <Controller name="potato.size" control={control} render={({field, fieldState: {error}}) => {
            return (
              <FormControl isInvalid={!!error?.message} mt={4}>
                <FormLabel htmlFor="size">Size</FormLabel>
                <Input id="size" type="text" onChange={field.onChange} defaultValue={field.value}/>
                {error?.message && (
                  <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
              </FormControl>
            )
          }} />
        )}


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

export const Route = createFileRoute("/nested-field-controller")({
  component: () => <FormExample />,
});
