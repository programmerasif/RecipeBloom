"use client";
import ManageRecipe from "../ManageRecipe/ManageRecipe";
import ManageUser from "../ManageUser/ManageUser";
import MyRecipes from "../MyRecipes/MyRecipes";
import AddNewRecipe from "./AddNewRecipe/AddNewRecipe";
import LogoutContent from "./LogoutContent/LogoutContent";

const DashboardInterface = ({
  activeComponent,
}: {
  activeComponent: string;
}) => {
  return (
    <div className="flex flex-1 p-4">
      {/* {activeComponent === "Dashboard" && <DashboardContent />} */}
      {activeComponent === "ManageUser" && <ManageUser />}
      {activeComponent === "ManageRecipe" && <ManageRecipe />}
      {/* {activeComponent === "Settings" && <SettingsContent />} */}
      {activeComponent === "Logout" && <LogoutContent />}
      {/* {activeComponent === "AdminSettings" && <AdminSettingsContent />} */}
      {activeComponent === "MyRecipes" && <MyRecipes />}
      {activeComponent === "AddNewRecipe" && <AddNewRecipe />}
    </div>
  );
};

export default DashboardInterface;
