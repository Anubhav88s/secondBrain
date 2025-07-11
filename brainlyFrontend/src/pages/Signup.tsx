import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Signup =  () => {
    const UserRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();


    async function  signup(){
        const username = UserRef.current?.value ;
        const password = passwordRef.current?.value ;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            username,
            password
        })
            navigate("/signin")

    }
    
 return (
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-slate-200 flex justify-center items-center px-4 sm:px-6">
    <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-300 shadow-xl w-full max-w-sm sm:max-w-md px-6 py-8 sm:px-10 sm:py-10 space-y-6 transition-all">
      <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 text-center tracking-tight">
        Create an Account
      </h2>
      <p className="text-center text-slate-500 text-sm sm:text-base">
        Join us today — it’s quick and easy
      </p>

      <div className="space-y-4">
        <Input placeholder="Username" referance={UserRef} type="text"/>
        <Input placeholder="Password" referance={passwordRef} type="password"/>
      </div>

      <div className="pt-2">
        <Button
          onClick={signup}
          varient="primary"
          text="Signup"
          fullWidth={true}
          loading={false}
        />
      </div>
    </div>
  </div>
);


}