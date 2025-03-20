import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // CSS 파일 유지

const NotFound = () => {
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/bg1.jpg)`, // public 폴더 이미지 적용
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  };

  return (
    <div style={backgroundStyle}>
      <div className="d-flex flex-column flex-root">
        <div className="d-flex flex-column-fluid flex-center">
          <div className="d-flex flex-center flex-column flex-lg-row p-10 p-lg-20">
            <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-end flex-row-fluid order-2 order-lg-1">
              <h1
                className="font-weight-boldest text-danger mb-5"
                style={{ fontSize: "8rem" }}
              >
                404
              </h1>
              <p className="font-size-h3 text-center text-muted font-weight-normal py-2">
                OOPS! Something went wrong here
              </p>
              <Link
                to="/"
                className="btn btn-light-primary font-weight-bolder py-4 px-8"
              >
                <span className="svg-icon svg-icon-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <polygon points="0 0 24 0 24 24 0 24" />
                      <rect
                        fill="#000000"
                        opacity="0.3"
                        transform="translate(12.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-12.000000, -12.000000)"
                        x="11"
                        y="5"
                        width="2"
                        height="14"
                        rx="1"
                      />
                      <path
                        d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z"
                        fill="#000000"
                        fillRule="nonzero"
                        transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997)"
                      />
                    </g>
                  </svg>
                </span>
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
