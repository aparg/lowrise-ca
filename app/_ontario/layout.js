import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function ResaleLayout({ children }) {
  return (
    <main className="mb-64">
      {children}
      <div className="flex flex-col items-center mb-4 md:mb-5 mt-32">
        <Image
          src="/contact-bottom-2.png"
          alt="Real Estate Agent"
          width={300}
          height={300}
          className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
          priority
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Looking for Your Perfect Home?
        </h2>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Let us help you find the perfect home that matches your lifestyle
        </p>
      </div>
      <ContactForm />
      <div className="my-10 md:my-32"></div>
    </main>
  );
}
