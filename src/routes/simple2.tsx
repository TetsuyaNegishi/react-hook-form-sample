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
import { type TypeOf, boolean, object, string } from "zod";

const schema = object({
  name: string().min(1, "Name is required"),
  email: string().email("Invalid email address"),
  password: string().min(8, "Password must be at least 8 characters long"),
  termsAccepted: boolean().refine(
    (val) => val === true,
    "You must accept the terms",
  ),
});

type FormData = TypeOf<typeof schema>;

const FormExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [formData, setFormData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setFormData(data);
  };

  return (
    <div>
      <h1>Simple Example</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.email} mt={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.password} mt={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.termsAccepted} mt={4}>
          <FormLabel htmlFor="termsAccepted">
            Accept Terms & Conditions
          </FormLabel>
          <Checkbox id="termsAccepted" {...register("termsAccepted")}>
            I agree
          </Checkbox>
          {errors.termsAccepted && (
            <FormErrorMessage>{errors.termsAccepted.message}</FormErrorMessage>
          )}
        </FormControl>

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

export const Route = createFileRoute("/simple2")({
  component: () => <FormExample />,
});
