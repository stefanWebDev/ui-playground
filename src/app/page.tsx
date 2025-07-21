import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans p-8 flex flex-col gap-8">
      <h2 className="text-lg">UI Components:</h2>
      <div className="flex flex-col gap-2">
        <Link href="/auth/signup">sign up</Link>
        <Link href="/auth/signin">sign in</Link>
      </div>
    </div>
  );
}
