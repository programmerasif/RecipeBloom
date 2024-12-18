"use client";
import Connection from "../Connection/Connection";
import DashboardContent from "../DashboardContent/DashboardContent";
import ManageRecipe from "../ManageRecipe/ManageRecipe";
import ManageUser from "../ManageUser/ManageUser";
import MyRecipes from "../MyRecipes/MyRecipes";
import AddNewRecipe from "./AddNewRecipe/AddNewRecipe";
import LogoutContent from "./LogoutContent/LogoutContent";
import UserProfile from "./Profile/Profile";
import UpdatePass from "./UpdatePass/UpdatePass";

const DashboardInterface = ({
  activeComponent,
}: {
  activeComponent: string;
}) => {
  console.log(activeComponent );
  
  return (
    <div className="flex flex-1 p-4">
      {activeComponent === "Dashboard" && <DashboardContent />}
      {activeComponent === "ManageUser" && <ManageUser />}
      {activeComponent === "ManageRecipe" && <ManageRecipe />}
      {/* {activeComponent === "Settings" && <SettingsContent />} */}
      {activeComponent === "Logout" && <LogoutContent />}
      {/* {activeComponent === "AdminSettings" && <AdminSettingsContent />} */}
      {activeComponent === "MyRecipes" && <MyRecipes />}
      {activeComponent === "AddNewRecipe" && <AddNewRecipe />}
      {activeComponent === "Profile" && <UserProfile />}
      {activeComponent === "Connection" && <Connection />}
      {activeComponent === "UpdatePass" && <UpdatePass />}
    </div>
  );
};

export default DashboardInterface;
