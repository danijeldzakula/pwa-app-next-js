import Counter from "@/components/counter/Counter";
import Notes from "@/components/notes/Notes";

export const metadata = {
  title: "Demo",
  description: "Demo",
};

export default function Home() {
  return (
    <>
      <h1 className="text-2xl">Home Page</h1>
      <Counter />
      <Notes />
    </>
  )
}
