"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const Page = () => {
  const router = useRouter();

  interface Payload {
    email: string;
    password: string;
  }

  const account = {
    email: "admin@ok.com",
    password: "123456",
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                className="p-6 md:p-8"
                action={async (e) => {
                  const formData = Object.fromEntries(e.entries());

                  const payload: Payload = {
                    email: formData["email"] as string,
                    password: formData["password"] as string,
                  };

                  if (
                    payload.email !== account.email ||
                    payload.password !== account.password
                  ) {
                    alert("Invalid Credentials");
                    return;
                  } else {
                    setCookie(
                      "sezy",
                      { admin: true },
                      {
                        maxAge: 60 * 60 * 24 * 7,
                      }
                    );

                    router.push("/admin/dashboard");
                  }
                }}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to Sendezy Admin Portal
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/* <Link
                        href="/"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link> */}
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </form>
              <div className="relative hidden bg-[#00285C] md:block">
                <Image
                  src="/logo.jpg"
                  alt="Image"
                  className="absolute inset-0 w-full my-auto object-cover dark:brightness-[0.2] dark:grayscale"
                  width={600}
                  height={800}
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <Link href="/">Terms of Service</Link> and{" "}
            <Link href="/">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
