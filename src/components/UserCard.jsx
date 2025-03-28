import { Avatar, Tag } from "antd";

const UserCard = ({ user }) => {
  return (
    <div className="rounded-lg border border-[#8A8E9D] px-5 py-4">
      <div className="flex items-center gap-3">
        <Avatar size={"large"} src="https://via.placeholder.com/40" />
        <h2 className="text-lg font-semibold">{user.name}</h2>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#8A8E9D] pt-4">
        <FieldValue title="ID" value={user.id} />
        <FieldValue title="Phone Number" value={user.department} />
        <FieldValue title="Department" value={user.department} />
        <FieldValue
          title=" Joining Date"
          value={new Date(user.joiningDate).toLocaleDateString()}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-5 border-t border-[#8A8E9D] pt-4 align-middle">
        <FieldValue title="Email" value={user.email} />
        <div>
          <Tag
            color={user?.status === "active" ? "green" : "red"}
            style={{
              padding: "10px 16px",
              width: "100%",
              textAlign: "center",
              marginTop: "4px",
            }}
            className="capitalize"
          >
            {user?.status}
          </Tag>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

const FieldValue = ({ title, value }) => (
  <div>
    <p>{title}</p>
    <p className="text-[#545A70]">{value}</p>
  </div>
);
