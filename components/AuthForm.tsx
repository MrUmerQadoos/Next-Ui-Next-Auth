"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  Button,
  Card,
  CardBody,
  Tabs,
  Tab,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

// Define validation schemas for both forms
const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

const signUpSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required")
      .min(8, "Password must have at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function AuthForm() {
  const [selected, setSelected] = React.useState<string | number>("login");
  const [signInError, setSignInError] = React.useState<string | null>(null);
  const router = useRouter();

  // SignIn Form
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInSubmit = async (values: SignInFormValues) => {
    console.log(values);
    try {
      const signInData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInData?.error) {
        setSignInError("Please put a valid email and password.");
      } else {
        router.push("/user");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setSignInError("An error occurred. Please try again.");
    }
  };

  // SignUp Form
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignUpSubmit = async (values: SignUpFormValues) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Switch to the sign-in tab after successful sign-up
        setSelected("login");
      } else {
        const data = await response.json();
        alert(data.error || "An error occurred during sign-up.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card className="max-w-md w-full">
        <CardBody>
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key)}
          >
            <Tab key="login" title="Login">
              <form
                onSubmit={signInForm.handleSubmit(onSignInSubmit)}
                className="flex flex-col gap-4"
              >
                <div>
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    {...signInForm.register("email")}
                  />
                  {signInForm.formState.errors.email && (
                    <p className="text-red-500">
                      {signInForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    {...signInForm.register("password")}
                  />
                  {signInForm.formState.errors.password && (
                    <p className="text-red-500">
                      {signInForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                {signInError && <p className="text-red-500">{signInError}</p>}
                <div className="flex justify-between items-center">
                  <Button type="submit" color="primary" fullWidth>
                    Login
                  </Button>
                </div>
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onClick={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                className="flex flex-col gap-4"
              >
                <div>
                  <Input
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    {...signUpForm.register("username")}
                  />
                  {signUpForm.formState.errors.username && (
                    <p className="text-red-500">
                      {signUpForm.formState.errors.username.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    {...signUpForm.register("email")}
                  />
                  {signUpForm.formState.errors.email && (
                    <p className="text-red-500">
                      {signUpForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    {...signUpForm.register("password")}
                  />
                  {signUpForm.formState.errors.password && (
                    <p className="text-red-500">
                      {signUpForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    isRequired
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    {...signUpForm.register("confirmPassword")}
                  />
                  {signUpForm.formState.errors.confirmPassword && (
                    <p className="text-red-500">
                      {signUpForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Button type="submit" color="primary" fullWidth>
                    Sign up
                  </Button>
                </div>
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onClick={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
