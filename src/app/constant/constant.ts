

export const navMenu = (role:string) =>{
  console.log(role);
  
    const dashBoardLink =
    role == "admin"
      ? "admin-dashboard"
      : role == "user"
      ? "user-dashboard"
      : "login";
    const menus = [
        { id: 1, href: "/", linkText: "Home" },
        // { id: 2, href: "/packages", linkText: "Discover" },
        { id: 4, href: "/recipe-feed", linkText: "Recipe Feed" },
        { id: 5, href: "/about-us", linkText: "About Us" },
        { id: 6, href: "/Contact", linkText: "Contact" },
        { id: 7, href: `/${dashBoardLink}`, linkText: "Dashboard" },
      ];
      return menus
  }

 