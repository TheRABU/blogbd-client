import { getUserSession } from "@/src/helpers/getUserSession";

const DashboardPage = async () => {
  const session = await getUserSession();

  console.log("getUserSession from dashboard", session);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome, {session?.user?.name}!
        </h1>
        <p className="text-lg text-gray-600 italic text-center">
          {session?.user?.email}
        </p>
        <p className="text-lg text-gray-600 italic text-center">
          id: {session?.user?.id}
        </p>
      </div>
    </>
  );
};

export default DashboardPage;
