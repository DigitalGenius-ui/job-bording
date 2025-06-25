import male from "../images/male.jpg";
import female from "../images/female.jpg";
import noneGender from "../images/question.png";

export const CompanyAvatar = ({ userImg }) => {
  return (
    <>
      {userImg ? (
        <img
          className="w-11 h-11 object-cover rounded-full border-2 border-gray-200"
          src={userImg || noneGender}
          alt="user"
        />
      ) : (
        <div
          className="w-11 h-11 object-cover rounded-full border-2 border-gray-200
              text-[0.4rem] flex items-center justify-center text-center"
        >
          COMPANY <br /> PROFILE
        </div>
      )}
    </>
  );
};

export const UserAvatar = ({ profile }) => {
  console.log(profile);
  const profilImg =
    profile.gender === "male"
      ? male
      : profile.gender === "female"
      ? female
      : noneGender;
  return (
    <>
      <img
        className="w-11 h-11 object-cover rounded-full border-2 border-gray-200"
        src={profile?.userImg || profilImg}
        alt="user"
      />
    </>
  );
};
