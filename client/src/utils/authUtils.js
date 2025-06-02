const env = import.meta.env;

export const isLoggedIn =async()=>{
    const token = localStorage.getItem("token");
    // console.log("token"+token)
    const response = await fetch(`${env.VITE_SERVER_URL}/user/verify`, {
        method: "GET",
        headers: {
            "Authorization":token
        },
      });
      if(response.ok){
        const {user} = await response.json();
        // console.log("isLoggedIn: " +user)
        return {loggedIn:true, data:user};
      }
      else{
        return {loggedIn:false};
      }
}

export default isLoggedIn;