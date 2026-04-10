import Profile from "@/app/components/profile";
const page = async ({ params }) => {
  const { username } = await params;
  return (
    <>
      <div className="">
        <Profile username={username} />
      </div>
    </>
  );
};

export default page;
