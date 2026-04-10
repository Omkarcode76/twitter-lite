import UserFollows from "@/app/components/UserFollows"

const page = async ({params}) => {
  const {username} = await params
  return (
    <div>
      <UserFollows username={username} type={"followers"}/>
    </div>
  )
}

export default page
