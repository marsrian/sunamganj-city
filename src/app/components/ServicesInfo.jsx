import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
// import SanitizedContent from "./SanitizedContent";

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

const ServicesInfo = async () => {
  const services = await getServicesData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {services.map((service) => (
        <div
          key={service._id}
          className="flex flex-col rounded-lg shadow-lg p-4 border bg-white hover:shadow-xl transition-shadow duration-300"
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

          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">
              {service.service_name}
            </h3>
            <button>
              <Link href={`/services/${service._id}`} className="text-lg text-red-500 font-bold">→</Link>
            </button>
          </div>

          {/* {service.description && (
            <div className="prose prose-sm max-w-none text-gray-600">
              <SanitizedContent html={service.description} />
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default ServicesInfo;
