import ManageRecipe from "../ManageRecipe/ManageRecipe";
import ManageUser from "../ManageUser/ManageUser";
import MyRecipes from "../MyRecipes/MyRecipes";
import AddNewRecipe from "./AddNewRecipe/AddNewRecipe";

const DashboardInterface = ({ activeComponent }:{activeComponent:string}) => {
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

  export default DashboardInterface
  // Dummy dashboard component with dynamic content rendering


// // Components for different sections
// const DashboardContent = () => {
//     return <div>Dashboard content here</div>;
//   };
  
//   const ProfileContent = () => {
//     return <div>Profile content here</div>;
//   };
  
//   const SettingsContent = () => {
//     return <div>Settings content here</div>;
//   };
//   const AdminSettingsContent = () => {
//     return <div>Settings content here</div>;
//   };
  
  
  
  const LogoutContent = () => {
    return <div>Logout content here</div>;
  };
  