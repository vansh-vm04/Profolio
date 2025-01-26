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
        const data = await response.json();
        return {loggedIn:true, data:data.user};
      }
      else{
        return {loggedIn:false};
      }
}

export default isLoggedIn;