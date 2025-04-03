import Image from "next/image";
import Link from "next/link";

const AllServicesData = ({ data }) => {
  return (
    <table className="w-full mt-8">
      <thead className="border-b border-stone-200 bg-stone-100 text-sm font-medium text-stone-600">
        <tr>
          <th className="px-2.5 py-2 text-start font-medium">Image</th>
          <th className="px-2.5 py-2 text-start font-medium">Name</th>
          <th className="px-2.5 py-2 text-start font-medium">Action</th>
        </tr>
      </thead>
      <tbody className="group text-sm text-stone-800">
        {data.map((item) => (
          <tr
            key={item._id}
            className="border-b border-stone-200 last:border-0"
          >
            <td className="p-2">
              <Image
                src={item?.image ? item.image : "/assets/profile.png"}
                width={40}
                height={40}
                alt="service name"
                className="rounded-full w-10 h-10"
              />
            </td>
            <td className="p-2 dark:text-white">{item.service_name}</td>
            <td className="p-2">
              <Link href={`/dashboard/services/services_all/${item._id}`}>
                <button className="text-xl text-white font-semibold rounded-md bg-[#FF3811] py-1 px-4 cursor-pointer">
                  Edit
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllServicesData;
