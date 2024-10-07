import React from 'react'

const About = () => {
    const teamMembers = [
        { name: "Asif Khan", role: "Founder", img: "https://i.ibb.co.com/zSxsmvV/Untitled-design.png" },
        { name: "Kathryn Murphy", role: "CTO", img: "https://pagedone.io/asset/uploads/1698650000.png" },
        { name: "Jerome Bell", role: "CMO", img: "https://pagedone.io/asset/uploads/1698659360.png" },
        { name: "Wade Warren", role: "CEO", img: "https://pagedone.io/asset/uploads/1698650109.png" },
        { name: "Leslie Alexander", role: "Customer Support", img: "https://pagedone.io/asset/uploads/1698650146.png" },
        { name: "Guy Hawkins", role: "HR", img: "https://pagedone.io/asset/uploads/1698650184.png" },
        { name: "Ronald Richards", role: "CO-Founder", img: "https://pagedone.io/asset/uploads/1698650213.png" },
        { name: "Devon Lane", role: "UI Designer", img: "https://pagedone.io/asset/uploads/1698650242.png" },
        { name: "Dianne Russell", role: "Product Designer", img: "https://pagedone.io/asset/uploads/1698650271.png" }
      ];
  return (
    <>
            <section className="">
              <div className="flex flex-col gap-y-8 xl:flex-row items-center max-w-6xl mx-auto mt-8 mb-20 rounded-lg ">
                <div className="ml-9 xl:ml-0">
                  <h2 className="font-manrope text-5xl font-bold text-gray-900 mb-6 ">About Us</h2>
                  <p className="text-md xl:text-lg text-gray-500 font-sans w-10/12">Welcome to GamSpace, GameSpace makes sports facility booking quick and easy. Reserve courts and fields for your favorite sports with just a few clicks. Enjoy seamless scheduling, transparent pricing, and exclusive offers at GameSpace, your go-to platform for all sports activities.</p>
                </div>
                <div className="w-10/12 h-[50vh]">
                  <img className="hover:translate-x-2 h-full duration-500 hover:scale-105 rounded-xl object-cover" src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                  <h2 className="font-manrope text-5xl text-center font-bold text-gray-900 mb-6">Meet the brains</h2>
                  <p className="text-lg text-gray-500 text-center">These people work on making our product best.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-y-14 max-w-3xl mx-auto lg:max-w-full">
                  {teamMembers.map(member => (
                    <TeamMember key={member.name} {...member} />
                  ))}
                </div>
              </div>
            </section>
          </>
  )
}

export default About
const TeamMember = ({ name, role, img }: any) => (
    <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
      <div className="relative mb-5">
        <img src={img} alt={`${name} image`} className="w-28 h-28 rounded-2xl object-cover mx-auto transition-all duration-500 border-2 border-solid border-transparent group-hover:border-def" />
      </div>
      <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-def">{name}</h4>
      <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">{role}</span>
    </div>
  );