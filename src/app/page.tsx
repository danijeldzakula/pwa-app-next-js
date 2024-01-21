import Button from "@/components/button/Button";
import Counter from "@/components/counter/Counter";
import Notes from "@/components/notes/Notes";
import { Container } from "@/content/Content";

export const metadata = {
  title: "Demo",
  description: "Demo",
};

export default async function Home() {


  return (
    <>
      <div className="container mx-auto px-4">
        <Button />
      </div>

      {/* <Container>
        <Counter />
        <Notes />
      </Container> */}
    </>
  )
}
