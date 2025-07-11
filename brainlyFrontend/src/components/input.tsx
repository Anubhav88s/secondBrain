// Input box
interface InputProps {
  placeholder: string;
  referance: any;
  type: "password" | "text" ;
}

export const Input = ({ referance, placeholder, type}: InputProps) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        ref={referance}
        className="w-full px-4 py-2 m-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white text-slate-700 placeholder-slate-400 transition"
      />
    </div>
  );
};
