import { FiTrash } from "react-icons/fi";

const EachAdminCard = (props) => {
  const { data, eachProfileDeletion, keepChecked } = props;
  const { name, email, role, id, isChecked } = data;

  const deleteProfile = () => {
    eachProfileDeletion(id);
  };

  const Checked = keepChecked ? true : isChecked;
  return (
    <div className="list-styling">
      <div className="admin-card">
        <input
          type="checkbox"
          defaultChecked={Checked}
          value={id}
          className="check-box-positioner"
        />
        <div className="individual-positioner">
          <p className="set-position">{name}</p>
        </div>
        <div className="individual-positioner">
          <p className="set-position">{email}</p>
        </div>
        <div className="individual-positioner">
          <p className="set-position">{role}</p>
        </div>

        <FiTrash className="check-box-positioner" onClick={deleteProfile} />
      </div>
    </div>
  );
};

export default EachAdminCard;
