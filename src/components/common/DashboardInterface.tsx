import MyRecipes from "../MyRecipes/MyRecipes";

const DashboardInterface = ({ activeComponent }:{activeComponent:string}) => {
    return (
      <div className="flex flex-1 p-4">
        {activeComponent === "Dashboard" && <DashboardContent />}
        {activeComponent === "Profile" && <ProfileContent />}
        {activeComponent === "Settings" && <SettingsContent />}
        {activeComponent === "Logout" && <LogoutContent />}
        {activeComponent === "AdminSettings" && <AdminSettingsContent />}
        {activeComponent === "MyRecipes" && <MyRecipes />}
      </div>
    );
  };

  export default DashboardInterface
  // Dummy dashboard component with dynamic content rendering


// Components for different sections
const DashboardContent = () => {
    return <div>Dashboard content here</div>;
  };
  
  const ProfileContent = () => {
    return <div>Profile content here</div>;
  };
  
  const SettingsContent = () => {
    return <div>Settings content here</div>;
  };
  const AdminSettingsContent = () => {
    return <div>Settings content here</div>;
  };
  
  
  
  const LogoutContent = () => {
    return <div>Logout content here</div>;
  };
  