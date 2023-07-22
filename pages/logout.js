import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

const Custom404 = () => {

    const router = useRouter();
    useEffect(() => {
        setCookie("authToken", (""), {
            path: "/",
            maxAge: 0, // Expires after one week
            sameSite: true,
          })
          router.push("/")
      }, []);
    return (
        <div>
          {/* <!-- Page --> */}
      

            <div className="page main-signin-wrapper bg-primary construction">
                <h1 style={{textAlign:"center"}}>Logging out, Please wait....</h1>
    
            </div>
            {/* <!-- End Page --> */}
        </div>
      )
}

export default Custom404