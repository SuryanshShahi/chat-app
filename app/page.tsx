"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./shared/Button";
import InputField from "./shared/InputField";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#111b21_0%,_#0b141a_55%)] px-4">
      <form
        className="flex w-full max-w-sm flex-col gap-y-4 rounded-2xl border border-[#2a3942] bg-[#111b21]/95 p-6 shadow-2xl shadow-black/40"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/home");
        }}
      >
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold text-[#e9edef]">Get Started</h1>
          <p className="text-sm text-[#8696a0]">Enter your name to continue</p>
        </div>
        <InputField
          type="text"
          placeholder="Enter your name"
          className="text-center"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" className="h-11 w-full">
          Register
        </Button>
      </form>
    </div>
  );
}
