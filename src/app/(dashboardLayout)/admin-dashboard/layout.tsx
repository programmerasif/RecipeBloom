import { ReactNode } from "react";

const AdminLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <h1>Admin sidebar</h1>
     {children}
    </div>
  );
};

export default AdminLayout;