import MenuItem from "../Sidebar/MenuItem";
import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
const HouseOwnerMenu = () => {

  return (
    <div>
         <MenuItem icon={MdHomeWork} label='My Listed House' address='/dashboard/house-owner/my-listed-house' />
         <MenuItem icon={BsFillHouseAddFill} label='Add New House' address='/dashboard/house-owner/add-new-house' />
         <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Rented Houses'
        address='/dashboard/house-owner/manage-rended-houses'
      />
    </div>
  )
};

export default HouseOwnerMenu;
