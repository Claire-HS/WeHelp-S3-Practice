"use client";
import { useState } from "react";
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
import { IconX, IconCheck } from "@tabler/icons-react";

import Header from "@/component/Header";
import Footer from "@/component/Footer";

export default function loginPage() {
  const router = useRouter();
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;
  const [type, setType] = useState<"login" | "register">("login");
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email 格式不正確"),
      password: (value) => (value.length >= 6 ? null : "密碼長度至少 6 字元"),
    },
  });

  function handleSubmit(values: typeof form.values) {
    if (type === "login") {
      showNotification({
        title: "登入成功",
        message: `歡迎回來，${values.username}`,
        color: "green",
        icon: checkIcon,
      });
      // console.log("登入中...", values);
      router.push("/account");
      // 呼叫登入 API
    } else {
      showNotification({
        title: "註冊成功",
        message: `帳號 ${values.email} 已建立，歡迎加入！`,
        color: "blue",
        icon: checkIcon,
      });
      // console.log("註冊中...", values);
      // 呼叫註冊 API
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="My Account Book" />
      <main className="flex-grow pt-[80px]">
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
              {type === "register" && (
                <TextInput
                  label="用戶名稱"
                  placeholder="用戶名稱"
                  {...form.getInputProps("name")}
                />
              )}

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
      </main>
      <Footer text="COPYRIGHT @ 2025 WeHelp Practice" />
    </div>
  );
}
