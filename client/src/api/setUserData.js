import serverLink from "../serverLink";
import axios from "axios";
const setUserData = async (user,setUser , navigate) => {
    if (!user) {
      if (localStorage.getItem("fuelgotoken")) {
        const token = JSON.parse(localStorage.getItem("fuelgotoken"));

        try {
          const response = await axios.get(
            serverLink + "/user/getuserdata",
            {
              token: token,
            },
            {
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          const { success } = response.data;

          if (success === true) {
            setUser(response.data.data)
            return
          } else {
            navigate("/");
          }
        } catch (error) {
            navigate("/");
          console.error("Network error:", error);
        }
      }else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };
  export {setUserData}