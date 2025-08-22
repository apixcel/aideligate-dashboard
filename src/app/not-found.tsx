import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="relative flex h-screen items-center justify-center">
      <div className="z-10 max-w-[450px] px-6 text-center sm:px-0">
        <span className="font-dm-mono mb-[8px] inline-block rounded-[8px] border border-darker bg-gradient-to-b from-dark-gray to-black-gray px-[12px] py-[6px] text-[12px] text-light uppercase">
          404
        </span>

        <h1 className="mb-[8px] text-[30px] font-[500] md:text-[48px] lg:text-[56px]">
          Page Not Found
        </h1>
        <p className="text-[14px] text-lighter md:text-[16px] lg:text-[18px]">
          We couldn’t find the page you were looking for. You can return to{" "}
          <Link href="/" className="text-lightest">
            our home page
          </Link>
          , or{" "}
          <Link href="/contact" className="text-lightest">
            drop us a line
          </Link>{" "}
          if you can’t find what you’re looking for.
        </p>
      </div>

      <div className="absolute top-1/4 right-0 bottom-0 left-0 w-full">
        <Image
          src="/images/not-found-bg-pattern.svg"
          alt="bg-image"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default NotFound;
