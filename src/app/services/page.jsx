import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { childVariants, parentVariants } from "@/components/common/Variants";

const getServicesData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/services`,
    {
      headers: new Headers(await headers()),
      next: { revalidate: 60 },
    }
  );
  return res.json();
};

export const metadata = {
  title: "Service",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const serviceTitle = "আমাদের সেবাসমূহ";

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const ServicesPage = async () => {
  const services = await getServicesData();
  return (
    <div className="mt-6 mb-6 md:mb-8 max-w-7xl mx-auto px-2 md:px-0">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="text-2xl font-bold text-center underline decoration-double underline-offset-8 "
      >
        {serviceTitle.split("").map((char, index) => (
          <motion.span key={index} variants={staggerVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-8"
      >
        {services
          .filter((service) => service.approval === "approved")
          .map((service) => (
            <motion.div
              variants={childVariants}
              key={service._id}
              className="flex flex-col rounded-lg shadow-md p-4 border bg-white hover:shadow-lg transition-shadow duration-300"
            >
              {service?.image && (
                <div className="mb-4 relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.service_name}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2 mb-2">
                <h3 className="text-xl font-semibold dark:text-black">
                  {service.service_name}
                </h3>
                <Link
                  href={`/services/${service._id}`}
                  className="text-lg text-red-800 font-bold underline"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default ServicesPage;
