import { ReactNode } from "react";

const UserLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        userSidebar
      {children}
    </div>
  );
};

export default UserLayout;