import loader from "../../assets/loader.png";
export default function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img className="w-[100px] animate-pulse " src={loader} alt="loading" />
    </div>
  );
}
