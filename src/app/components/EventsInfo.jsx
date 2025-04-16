import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import * as motion from "motion/react-client";
import { childVariants, parentVariants } from "@/components/common/Variants";

const getEventsData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/events`,
    {
      headers: new Headers(await headers()),
      next: { revalidate: 60 },
    }
  );
  return res.json();
};

const EventsInfo = async () => {
  const events = await getEventsData();

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      // whileInView="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
    >
      {events
        .filter((event) => event.approval === "approved")
        .map((event) => (
          <motion.div
            variants={childVariants}
            key={event._id}
            className="flex flex-col rounded-lg shadow-md border bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {event?.image && (
              <div className="relative h-60 w-full">
                <Image
                  src={event.image}
                  alt={event.event_title}
                  fill
                  className="rounded-t-lg object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {event?.event_status === "closed" ? (
                  <p className="absolute right-4 top-4 text-white font-medium bg-red-500 p-2 rounded-full">
                    {event?.event_status}
                  </p>
                ) : (
                  <p className="absolute right-4 top-4 text-white font-medium bg-green-400 p-2 rounded-full">
                    {event?.event_status}
                  </p>
                )}
              </div>
            )}

            <div className="mb-2 p-4 md:p-8">
              <h3 className="text-xl font-bold dark:text-black">
                {event.event_title}
              </h3>
              <p className="flex items-center gap-3 mt-4 dark:text-black">
                <FaMapMarkerAlt className="text-red-800" /> {event.location}
              </p>
              <button className="mt-4">
                <Link
                  href={`/events/${event._id}`}
                  className="text-lg text-red-800 font-bold underline"
                >
                  Read More
                </Link>
              </button>
            </div>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default EventsInfo;
