"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { auth } from "@/lib/firebase";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [type, setType] = useState<"login" | "register">("login");
  const [member, setMember] = useState<User | null>(null);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email 格式不正確"),
      password: (value) => (value.length >= 6 ? null : "密碼長度至少 6 字元"),
    },
  });

  async function handleSubmit(values: typeof form.values) {
    const showSuccessNotification = (
      title: string,
      message: string,
      color: string
    ) => {
      showNotification({
        title,
        message,
        color,
        icon: <IconCheck size={20} />,
        autoClose: 2000,
      });
    };

    const showErrorNotification = (title: string, message: string) => {
      showNotification({
        title,
        message,
        color: "red",
        icon: <IconX size={20} />,
      });
    };

    try {
      let userCredential;
      if (type === "login") {
        userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        showSuccessNotification(
          "登入成功",
          `歡迎回來，${userCredential.user.email}`,
          "green"
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        showSuccessNotification(
          "註冊成功",
          `帳號 ${userCredential.user.email} 已建立，歡迎加入！`,
          "blue"
        );
      }
    } catch (error: unknown) {
      console.error("Firebase Auth Error:", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "string"
      ) {
        const err = error as { code: string; message?: string };
        if (err.code === "auth/invalid-credential") {
          showErrorNotification("登入失敗", "帳號或密碼錯誤，請再試一次");
        } else {
          showErrorNotification("操作失敗", err.message || "請再試一次");
        }
      } else {
        showErrorNotification("未知錯誤", "請再試一次");
      }
    }
  }

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const monitorAuthState = onAuthStateChanged(auth, (user) => {
      setMember(user || null);
    });
    return () => monitorAuthState();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="My Account Book" />
      <main className="flex-grow pt-[80px]">
        {member ? (
          <Container size={400} my={40}>
            <Title className="text-center">
              {member.email} <br />
              已登入
            </Title>
            <Button fullWidth mt="xl" onClick={() => router.push("/account")}>
              開始記帳
            </Button>
            <Button fullWidth mt="xl" onClick={logout}>
              登出
            </Button>
          </Container>
        ) : (
          <Container size={400} my={40}>
            <Title className="text-center">
              {type === "login" ? "登入帳號" : "建立新帳號"}
            </Title>
            <Text size="sm" mt={5} className="text-center">
              {type === "login" ? "還沒有帳號嗎？" : "已有帳號？"}{" "}
              <Anchor
                size="sm"
                onClick={() => setType(type === "login" ? "register" : "login")}
              >
                {type === "login" ? "建立帳號" : "登入"}
              </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                  label="Email"
                  placeholder="you@email.com"
                  mt="md"
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  label="密碼"
                  placeholder="密碼"
                  mt="md"
                  {...form.getInputProps("password")}
                />

                <Button fullWidth mt="xl" type="submit">
                  {type === "login" ? "登入" : "註冊"}
                </Button>
              </form>
            </Paper>
          </Container>
        )}
      </main>
      <Footer text="COPYRIGHT @ 2025 WeHelp Practice" />
    </div>
  );
}
