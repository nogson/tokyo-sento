"use client";
import { FC } from "react";
import { useState, useRef } from "react";
import { TextInput, PasswordInput, Button, Alert, Anchor } from "@mantine/core";
import * as Yup from "yup";
import Image from "next/image";
import Logo from "@/common/images/logo.svg";
import styles from "./login.module.scss";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm, yupResolver } from "@mantine/form";
import { BiExclude } from "react-icons/bi";
import { AuthForm } from "@/types/auth";
import request from "@/lib/request/request";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("No email provided"),
  password: Yup.string()
    .required("No password provided")
    .min(5, "Password should be 5 chars minimum"),
});

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await request.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`,
          form.values
        );
      }
      // signupの場合は続けてアクセストークンを取得する為loginを実行
      await request.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        form.values
      );
      form.reset();
      router.push("/");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  const changeIsRegister = (value: boolean) => {
    setError("");
    setIsRegister(value);
  };

  return (
    <section className={styles.loginWrapper}>
      <div className={styles.loginContent}>
        <h1>
          <Image src={Logo} width={200} alt="Logo" priority />
        </h1>
        <div className={styles.loginInner}>
          <h2 className={styles.loginTitle}>
            {isRegister ? "LOGIN" : "SIGN UP"}
          </h2>
          {error && (
            <Alert
              color="red"
              variant="filled"
              icon={<BiExclude />}
              title="Authorization Error"
              radius="md"
            >
              {error}
            </Alert>
          )}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              radius="xl"
              placeholder="example@gmail.com"
              label="Email"
              required={true}
              inputWrapperOrder={["label", "error", "input", "description"]}
              mb={24}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              radius="xl"
              placeholder="5文字以上のパスワード"
              label="Password"
              required={true}
              description="5文字以上のパスワード"
              inputWrapperOrder={["label", "error", "input", "description"]}
              mb={32}
              {...form.getInputProps("password")}
            />
            <Button variant="filled" radius="xl" fullWidth={true} type="submit">
              {isRegister ? "新規登録" : "ログイン"}
            </Button>
            <div className={styles.loginRegister}>
              {isRegister
                ? "アカウントをお持ちの場合"
                : "アカウントをお持ちでない場合"}
              {isRegister ? (
                <Anchor onClick={() => changeIsRegister(false)}>
                  ログインはこちら
                </Anchor>
              ) : (
                <Anchor onClick={() => changeIsRegister(true)}>
                  登録はこちら
                </Anchor>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
