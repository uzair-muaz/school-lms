import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../redux/systemSlice";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { UserOutlined } from "@ant-design/icons";
const Header = () => {
  const dispatch = useDispatch();
  const { activeTab, user } = useSelector((state) => state.system);
  return (
    <div className="flex h-20 w-full items-center justify-between bg-white px-10">
      <div className="flex items-center gap-3">
        <div
          className="rounded-full bg-[#f8f8f8] p-2"
          onClick={() => dispatch(setSidebar())}
        >
          <HiMiniBars3BottomRight className="cursor-pointer text-xl text-[#8A8E9D]" />
        </div>
        <h1 className="text-2xl font-semibold">{activeTab}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar icon={<UserOutlined />} />
          <div className="text-sm">
            <p className="text-blue-500">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
