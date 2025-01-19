import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center min-h-svh p-2">
        <h2 className="text-xl font-bold text-center">Social Clout</h2>
        <h3 className="md:text-5xl text-3xl font-light text-center">We are coming sooooon...</h3>
        <Button asChild>
          <Link href="/dashboard">Check Dashboard</Link>
        </Button>
      </div>
    </>
  );
}