import React, {useEffect} from "react";
import {useParams} from "react-router";

function GoogleLoginRedirect(){
  const { token } = useParams();

  useEffect(()=>{
    localStorage.clear();
    localStorage.setItem('token', token);
    window.location.replace("/");
  },[]);

  return <></>;
}

export default GoogleLoginRedirect;