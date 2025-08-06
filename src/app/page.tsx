import { List } from "@/components/custom/List";


export default function Home() {
  return (
    <div className="font-sans p-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-4 tracking-tight">UI Components:</h1>
      <List
        items={[
          { id: "1", label: "sign up", link: "/auth/signup" },
          { id: "2", label: "sign in", link: "/auth/signin" },
          { id: "3", label: "change theme", link: "/theme" },
          { id: "4", label: "modal", link: "/modal" },
        ]}
      />
    </div>
  );
}
