import { BsFingerprint } from 'react-icons/bs'
import MenuItem from '../Sidebar/MenuItem';
const HouseRenterMenu = () => {

  return (
    <div>
      
      <MenuItem
        icon={BsFingerprint}
        label='My Rentals'
        address='/dashboard/house-renter/my-rentals'
      />
    </div>
  )
};

export default HouseRenterMenu;
