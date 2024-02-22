import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import store from "./store";
// import "./i18n";
import { CookiesProvider } from "react-cookie";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<CookiesProvider>
		<Provider store={store}>
			<BrowserRouter basename="/">
				<App />
				<ToastContainer />
			</BrowserRouter>
		</Provider>
	</CookiesProvider>,

	document.getElementById("root")
);

serviceWorker.unregister();
