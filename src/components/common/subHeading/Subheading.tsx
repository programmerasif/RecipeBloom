const Subheading = ({text}:{text:string}) => {
  return (
    <h3 className="text-2xl font-bold sm:text-3xl md:text-3xl lg:text-4xl ">
      {text}
    </h3>
  );
};

export default Subheading;