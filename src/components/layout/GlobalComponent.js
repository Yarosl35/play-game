import { LogoutConfirm } from "../queries/LogoutConfirm";
import { useSelector } from "react-redux";
import React from "react";

export const GlobalComponent = () => {
  const isShowLogoutConfirm =  useSelector(({isShowLogoutConfirm}) => isShowLogoutConfirm);

  return (
    <div>
      { isShowLogoutConfirm ? <LogoutConfirm /> : null }
    </div>
  )
}