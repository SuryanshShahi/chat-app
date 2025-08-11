"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./shared/Button";
import InputField from "./shared/InputField";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  return (
    <div className="bg-neutral-900 h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/home");
        }}
      >
        <InputField
          type="text"
          placeholder="Enter your name"
          className="text-center"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" className="mx-auto">
          Register
        </Button>
      </form>
    </div>
  );
}
