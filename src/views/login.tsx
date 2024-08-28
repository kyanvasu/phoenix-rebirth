"use client";

import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface LoginProps {
  image?: {
    alt?: string;
    src: string | StaticImport;
    width?: number | `${number}`;
    height?: number | `${number}`;
    className?: string;
  };
  children?: JSX.Element;
  card?: {
    logo?: {
      alt?: string;
      src: string | StaticImport;
      width?: number | `${number}`;
      height?: number | `${number}`;
      className?: string;
    };
    title?: string;
    inputs?: {
      email: {
        label: string;
        placeholder: string;
      };
      password: {
        label: string;
        placeholder: string;
      };

      check: string;
    };
    forgot?: {
      text: string;
      url: string;
    };
    action?: string;
  };
  onLogin?: (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => Promise<void> | void;
  onError?: (error: any) => void;
}

const defaults: LoginProps = {
  image: {
    alt: "Image",
    width: "1920",
    height: "1080",
    src: "https://ui.shadcn.com/placeholder.svg",
    className:
      "h-full w-full object-cover",
  },
  card: {
    logo: {
      alt: "Logo",
      width: 200,
      height: 200,
      src: "https://dev.app.kanvas.dev/images/Kanvas_Logo_white.svg",
      className: "w-25 bg-primary p-2 rounded",
    },
    inputs: {
      email: {
        label: "Email",
        placeholder: "email",
      },
      check: "Remember me",
      password: {
        label: "Password",
        placeholder: "password",
      },
    },
    title: "Sign in to your account",
    action: "Login",
    forgot: {
      text: "Forgot Password?",
      url: "/forgot-password",
    },
  },
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  remember: Yup.boolean(),
});

export function Login(props: LoginProps) {
  return (
    <div className="w-svw lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-svh">
      <div className="hidden bg-muted lg:block">
        <Image
          className={cn(defaults.image?.className, props.image?.className)}
          height={props.image?.height ?? defaults.image?.height}
          width={props.image?.width ?? defaults.image?.width}
          src={props.image?.src ?? defaults.image?.src!}
          alt={props.image?.alt ?? defaults.image?.alt!}
        />
      </div>

      <div className="flex items-center justify-center py-12">
        {props.children ? props.children : <LoginCard {...props} />}
      </div>
    </div>
  );
}

function LoginCard(props: LoginProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (props.onLogin) {
          await props.onLogin(values);
        } else {
          console.log("Login successful", values);
        }
      } catch (error) {
        if (props.onError) {
          props.onError(error);
        } else {
          console.error("Login failed", error);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card className="mx-auto w-96 shadow-md">
      <CardHeader className="pt-10 pb-6">
        <CardTitle>
          <Image
            className={cn(
              defaults.card?.logo?.className,
              props.card?.logo?.className
            )}
            height={props.card?.logo?.height ?? defaults.card?.logo?.height}
            width={props.card?.logo?.width ?? defaults.card?.logo?.width}
            alt={(props.card?.logo?.alt ?? defaults.card?.logo?.alt)!}
            src={props.card?.logo?.src ?? defaults.card?.logo?.src!}
          />
        </CardTitle>
        <CardDescription className="text-2xl font-semibold">
          {props.card?.title ?? defaults.card?.title}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={formik.handleSubmit} className="grid gap-8">
          <div className="grid gap-2">
            <Label htmlFor="email">
              {props.card?.inputs?.email.label ??
                defaults.card?.inputs?.email.label}
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder={
                props.card?.inputs?.email.placeholder ??
                defaults.card?.inputs?.email.placeholder
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="text-destructive text-sm">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">
                {props.card?.inputs?.password.label ??
                  defaults.card?.inputs?.password.label}
              </Label>
            </div>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder={
                props.card?.inputs?.password.placeholder ??
                defaults.card?.inputs?.password.placeholder
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="text-destructive text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={formik.values.remember}
                onCheckedChange={(e: boolean) => {
                  formik.setValues((state) => ({
                    ...state,
                    remember: e,
                  }));
                }}
              />

              <Label htmlFor="remember">
                {props.card?.inputs?.check ?? defaults.card?.inputs?.check}
              </Label>
            </div>

            <div>
              <Link
                href={(props.card?.forgot?.url ?? defaults.card?.forgot?.url)!}
                className="underline"
              >
                {props.card?.forgot?.text ?? defaults.card?.forgot?.text}
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <Button
              type="submit"
              className="w-full uppercase"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Logging in..."
                : props.card?.action ?? defaults.card?.action}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
