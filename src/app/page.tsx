import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Specialities from "@/components/Specialities";
import MenuSlideshow from "@/components/MenuSlideshow";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import BakeryDoodles from "@/components/BakeryDoodles";
import { getMenuItems } from "@/lib/menu";

export default async function Home() {
  const items = await getMenuItems();

  const heroPhotos = items
    .filter(
      (it) => it.available && it.photos.length,
    )
    .slice(0, 6)
    .map((it) => it.photos[0].url);

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden">
        <BakeryDoodles />

        <div className="relative z-10">
          <Hero photos={heroPhotos} />

          <About />

          {/* Know About Me */}

          <section className="px-5 py-10 sm:py-14">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-[2rem] bg-parchment/60 px-6 py-8 text-center shadow-sm sm:px-10">
                <p className="font-hand text-2xl text-caramel sm:text-3xl">
                  There&apos;s a story behind every cake ♡
                </p>

                <h2 className="mt-2 font-display text-3xl font-bold text-choc sm:text-4xl">
                  Want to know more about the baker?
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-choc/65 sm:text-base">
                  Meet Ridhima, discover how The Baker Ri started,
                  and take a little peek behind the homemade magic.
                </p>

                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-choc px-6 py-3 text-sm font-bold text-cream shadow-md transition hover:bg-caramel"
                >
                  Know About Me
                  <span>♡</span>
                </Link>
              </div>
            </div>
          </section>

          <Specialities />

          <MenuSlideshow items={items} />
        </div>
      </main>

      <Footer />
      <ChatBot />
    </>
  );
}