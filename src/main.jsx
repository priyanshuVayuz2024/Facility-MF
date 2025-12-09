import { StrictMode, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MicrofrontendLoader from './MFloader/MicroFrontendLoader.jsx'
import React from "react";
import * as MaterialUI from "@mui/material";
import ReactDOM from "react-dom";
import * as EmotionReact from "@emotion/react";
import * as EmotionStyled from "@emotion/styled";
import * as MuiIcons from "@mui/icons-material";
import * as ReactRouterDOM from "react-router-dom";
import * as StylesMUI from "@mui/material/styles";
import * as ReactHotToast from "react-hot-toast";





const PrimaryLayout = () => {
  window.React = React;
  window.ReactDOM = ReactDOM;
  window.MaterialUI = MaterialUI;
  window.EmotionReact = EmotionReact;
  window.EmotionStyled = EmotionStyled;
  window.MuiIcons = MuiIcons;
  window.ReactRouterDOM = ReactRouterDOM;
  window.process = { env: {} };
  window.StylesMUI = StylesMUI;
  window.ReactHotToast = ReactHotToast;


  const [open, setOpen] = useState(true);
  const mfRef = useRef(null);
  const headerRef = useRef(null);


  const [headerLoaded, setHeaderLoaded] = useState(false);
  const [sidebarLoaded, setSidebarLoaded] = useState(false);


  let routes = JSON.parse('[{"text":"NoticeBoard","containerId":"noticeBoardMF","url":" / notice - board","bundleLink":"https://d18aratlqkym29.cloudfront.net/frontend-build/Noticeboard/1.1/mf/noticeboard-bundle.js","cssLink":"https://d18aratlqkym29.cloudfront.net/frontend-build/Noticeboard/1.1/mf/noticeboardmf.css","additionalLink":[],"layout":true},{"text":"Login","containerId":"signInMF","url":"/sign-in/","bundleLink":"https://d18aratlqkym29.cloudfront.net/frontend-build/login/1.1/mf/signin-bundle.js","cssLink":null,"group":{"_id":"687744be75039553643227d9","moduleGroupId":"moduleGroupId_1752646846085","moduleName":"Dashboard","moduleIcon":"AcUnit","category":"General"},"additionalLink":["https://d18aratlqkym29.cloudfront.net/frontend-build/login/1.1/mf/signin-bundle.js"],"layout":false}]')
  let config = []

  // Only pass static props at initial mount
  const stableProps = useMemo(() => ({
    open,
    setOpen,
    setHeaderLoaded
  }), []);


  // Update MF props when location changes
  useEffect(() => {
    if (mfRef.current?.updateProps) {
      mfRef.current.updateProps({ open, setOpen, routes });
    }
    if (headerRef.current?.updateProps) {
      headerRef.current.updateProps({ open, setOpen, config });
    }
  }, [open, routes, config]);


  const layoutBundlesLoaded = headerLoaded && sidebarLoaded;



  return <>
    <div className="fixed w-full z-10 bg-white">
      <MicrofrontendLoader
        ref={headerRef}
        scriptUrl={
          "https://d18aratlqkym29.cloudfront.net/frontend-build/header/1.1/mf/header-bundle.js?date=1765256423001"
        }
        mountDivId="headerMain"
        globalVarName="headerMain"
        propsToPass={stableProps}
      />
    </div>
    <div className="flex bg-var(--color-primary)">
      <MicrofrontendLoader
        ref={mfRef}
        scriptUrl={
          "https://d18aratlqkym29.cloudfront.net/frontend-build/sidebar/1.1/mf/sidebar-bundle.js?date=1765256423001"
        }
        mountDivId="sidebarMain"
        globalVarName="sidebarMain"
        propsToPass={stableProps}
        onLoad={() => setSidebarLoaded(true)}
      />
      <div className={`${!open ? "xl:max-w-[calc(100%-80px)]" : "xl:max-w-[calc(100%-240px)]"} relative min-h-[calc(100%-80px)]! p-4 xl:p-6 pt-[104px]! w-full bg-[#F5F9FE] dark:bg-slate-800`}>
        {true ? (
          <ReactRouterDOM.Outlet />
        ) : (
          <div className="fixed inset-0 bg-white z-40 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>

  </>
}




const AppWrapper = () => {
  return <>
    <ReactRouterDOM.BrowserRouter>
      <ReactRouterDOM.Routes>
        <ReactRouterDOM.Route path='/' element={<PrimaryLayout />}>
          <ReactRouterDOM.Route path='/*' element={<App />} />
        </ReactRouterDOM.Route>
      </ReactRouterDOM.Routes>
    </ReactRouterDOM.BrowserRouter>

  </>
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
