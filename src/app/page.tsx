import { List } from "@/components/List";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans p-8 flex flex-col gap-8">
      <h2 className="text-lg">UI Components:</h2>
      <List items={[
          { id: "1", label: "Sign up", link: "/auth/signup" },
          { id: "2", label: "Sign in", link: "/auth/signin" },
      ]} />
    </div>
  );
}
