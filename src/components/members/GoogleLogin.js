import React, {useEffect} from "react";
import {useParams} from "react-router";
import getUsernameAPI from "../../API/getUsernameAPI";

function GoogleLoginRedirect(){
  const { token } = useParams();

  useEffect(()=>{
    localStorage.clear();
    localStorage.setItem('token', token);
    getUsernameAPI(token).then((res) => {
      localStorage.setItem('username', res);
    });
    window.location.assign("/");
  },[]);

  return <></>;
}

export default GoogleLoginRedirect;