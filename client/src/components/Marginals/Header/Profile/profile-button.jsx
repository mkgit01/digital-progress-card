import { Avatar, Box } from "@mui/material";
import { usePopover } from "../../../../hook/usePopover";
import ProfilePopover from "./profile-popover";
import { useEffect, useState } from "react";
import useAuth from "../../../Auth/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";

export const ProfileButton = () => {
  const popover = usePopover();
  const { user } = useAuth();
  const [fullName, setFullName] = useState("FirstName LastName");
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            // console.log(userData);
            setFullName(userData.name || "FirstName LastName");
            setProfilePic(userData.profilePic || null);
            setEmail(userData.email || "");
            setPhone(userData.phone || "");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <Box>
      <Box
        ref={popover.anchorRef}
        onClick={popover.handleOpen}
        sx={{
          borderWidth: 2,
          borderColor: "gray",
          borderStyle: "solid",
          borderRadius: "50%",
          display: "inline-flex",
          bgcolor: "background.paper",
          cursor: "pointer",
        }}
      >
        <Avatar
          src={profilePic || undefined} // show image if exists
          sx={{
            width: 30,
            height: 30,
            margin: 0.3,
            bgcolor: profilePic ? "transparent" : "primary.main",
            color: "primary.contrastText",
          }}
        >
          {!profilePic && fullName.charAt(0).toUpperCase()}{" "}
          {/* fallback first letter */}
        </Avatar>
      </Box>

      <ProfilePopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
        name={fullName}
        email={email}
        phone={phone}
        profilePic={profilePic}
      />
    </Box>
  );
};
