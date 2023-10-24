import Router from "next/router";
import Nprogress from "nprogress";

Nprogress.configure({ showSpinner: false, minimum: 0.01, easing: "linear" });

let timeout: NodeJS.Timeout;
let timer: NodeJS.Timer;

function startProgress() {
  timeout = setTimeout(() => {
    timer = setInterval(() => {
      Nprogress.inc();
    }, 100);
  }, 166);
}

function stopProgress() {
  clearInterval(timer);
  clearTimeout(timeout);
  Nprogress.done();
}

Router.events.on("routeChangeError", stopProgress);
Router.events.on("routeChangeStart", startProgress);
Router.events.on("routeChangeComplete", stopProgress);

export default function NProgress() {
  return null;
}
