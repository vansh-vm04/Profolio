const env = import.meta.env;

export const download = async (user,resume,toast,navigate,dispatch,setResume) => {
    try {
      const userID = user.id;
        // console.log("userId: " + userID);
      const token = localStorage.getItem("token");
      const response = await fetch(`${env.VITE_SERVER_URL}/resume/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          UserID: userID,
          authorization: token,
        },
        body: JSON.stringify(resume),
      });
      if (response.status == 404 || response.status == 401) {
        sessionStorage.setItem("resume-download-pending",true);
        toast.info(`Please login to download resume`);
        navigate("/login");
      }
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        const resumes = await JSON.parse(response.headers.get("Resumes"));
        dispatch(setResume(resumes));
        sessionStorage.removeItem("resume-download-pending");
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occured, Try Again");
    }
  };