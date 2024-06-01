"use client";
import { FC } from "react";
import { useState, useRef } from "react";
import { TextInput, PasswordInput, Button, Alert, Anchor } from "@mantine/core";
import * as Yup from "yup";
import styles from "./login.module.scss";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm, yupResolver } from "@mantine/form";
import { BiExclude } from "react-icons/bi";
import { AuthForm } from "@/types/auth";
import { signUp, login } from "@/lib/request/auth";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("emailに誤りがあります")
    .required("emailは必須入力項目です"),
  password: Yup.string()
    .required("passwordは必須入力項目です")
    .min(5, "Passwordは5文字以上必要です"),
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
        await signUp(form.values);
      }
      // sighupの場合は続けてアクセストークンを取得する為loginを実行
      const res = await login(form.values);
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
        <h1 className={styles.loginTitle}>
          {isRegister ? "SIGN UP" : "LOGIN"}
        </h1>
        {error && (
          <Alert
            color="red"
            icon={<BiExclude />}
            title="Authorization Error"
            radius="md"
            mb={24}
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
            mb={24}
            {...form.getInputProps("password")}
          />
          {isRegister && (
            <TextInput
              radius="xl"
              placeholder="銭湯好き太郎"
              label="ニックネーム"
              inputWrapperOrder={["label", "error", "input", "description"]}
              mb={32}
              {...form.getInputProps("nickName")}
            />
          )}
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
                新規登録はこちら
              </Anchor>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
