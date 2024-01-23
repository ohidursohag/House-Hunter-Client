import useAuth from "../Hooks/useAuth";

const MainLayout = () => {
const {user} = useAuth()

console.log(user)
  return (
    <div>
       <div> This is MainLayout </div>
    </div>
  )
};

export default MainLayout;
