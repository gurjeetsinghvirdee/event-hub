import { Button } from "@/components/ui/button";
import Image from "next/image";
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
            <br />
            <Button style={orangeButton}>
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/hero.png"
            alt="hero banner"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Trust by <br /> Thousand of Events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          CategoryFilter
        </div>
      </section>
    </>
  );
};