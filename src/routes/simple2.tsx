import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react";

const schema = object({
  name: string().min(1, "Name is required"),
  email: string().email("Invalid email address"),
  password: string().min(8, "Password must be at least 8 characters long"),
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
          {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.email} mt={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.password} mt={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
        </FormControl>

        <Button mt={4} colorScheme="blue" type="submit">Submit</Button>
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
