import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z, { type TypeOf } from "zod";

const schema = z.object({
  options: z.object({
    drink: z.boolean(),
    potato: z.boolean(),
  }),
  potato: z
    .object({
      size: z.string(),
    })
    .optional(),
});

type FormData = TypeOf<typeof schema>;

const FormExample = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [formData, setFormData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setFormData(data);
  };

  const potatoValue = watch("options.potato");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.options?.drink} mt={4}>
          <Checkbox id="options.drink" {...register("options.drink")}>
            drink
          </Checkbox>
          <Checkbox id="options.potato" {...register("options.potato")}>
            potato
          </Checkbox>
        </FormControl>

        {potatoValue && (
          <FormControl isInvalid={!!errors.potato?.size} mt={4}>
            <FormLabel htmlFor="size">Size</FormLabel>
            <Input id="size" type="text" {...register("potato.size")} />
            {errors.potato?.size && (
              <FormErrorMessage>{errors.potato.size.message}</FormErrorMessage>
            )}
          </FormControl>
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

export const Route = createFileRoute("/nested-field")({
  component: () => <FormExample />,
});
