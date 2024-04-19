import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  const orangeButton = {
    background: "linear-gradient(to right, #ff4903, #FF7700, #FF8811)",
    color: "#fff"
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-">
            <h1 className="h1-bold">
              Discover, Book, and Experience Unforgettable Events with EventHub!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Your one-stop destination for discovering and booking unforgettable events.
              Explore a diverse range of experiences and effortlessly plan your next adventure with us!
            </p>
            <Button style={orangeButton}>
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
    
  );
}