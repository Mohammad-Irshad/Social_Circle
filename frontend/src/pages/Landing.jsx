import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import landingImage from "../images/image2.png";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./features/usersSlice";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <main>
        <div className="p-5 m-5 d-flex justify-content-center">
          <div className="row ">
            <div className="col-md-6 mt-4">
              <h3 className="">
                <span className="fs-1 fw-bold"> Social_</span>
                <span className="fs-1 fw-bold text-danger">Circle &#9675;</span>
              </h3>
              <div className="mt-5 pt-4">
                <p>
                  <span className="fs-1 fw-bold text-secondary">FOLLOW</span>
                  <span className="fs-6"> PEOPLE AROUND THE GLOBE</span>
                </p>
                <p>
                  <span className="fs-1 fw-bold text-secondary">CONNECT</span>
                  <span className="fs-6"> WITH YOUR FRIENDS</span>
                </p>
                <p>
                  <span className="fs-1 fw-bold text-secondary">SHARE</span>
                  <span className="fs-6"> WHAT YOU THINK</span>
                </p>
              </div>
              <div className="mt-5 pt-4">
                <div
                  className="bg-danger text-center text-white py-3 fw-medium"
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                  onClick={() => navigate("/signUp")}
                >
                  Join Now
                </div>
                <div>
                  <p className="text-center text-danger mt-2">
                    <Link style={{ textDecoration: "none" }} to="/logIn">
                      Already have an Account &gt;{" "}
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-4">
              <img
                src={landingImage}
                alt="landingPageImage"
                className="img-fluid"
                style={{
                  maxWidth: "480px",
                  maxHeight: "480px",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
