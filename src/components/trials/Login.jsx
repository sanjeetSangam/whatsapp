import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebase, auth } from "../../firebase/firebase";
import { userData } from "../../Redux/User_Data/action";
import db from "../../firebase/firebase";
import "./login.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [uploads, setUploads] = useState(false);
  // Inputs
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [name, setName] = useState("");

  const [gotUser, setGotUser] = useState([]);

  const user = useSelector((store) => store.user.user);

  const [fileUrl, setFileUrl] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFileChange = async (e) => {
    setUploads(true);

    let link = process.env.REACT_APP_IMAGE_LINK;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "whatsapp");

    const { data } = await axios.post(link, formData);
    setFileUrl(data.url);
    alert("Your Profile Pic is uploaded");
    setUploads(false);
  };

  // getting all the users from database---

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setGotUser(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  useEffect(() => {
    let cokk = localStorage.getItem("user");

    if (cokk) {
      dispatch(userData(JSON.parse(cokk)));
      navigate("/");

      return;
    }
  }, []);

  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10 ) {
      alert("Please Enter Valid Name or Phone Number");
      return;
    }

    if (isNaN(mynumber)) {
      alert("Please Enter Valid Number");
      return;
    }

    if (fileUrl === null) {
      alert("Please Upload Profile image");
      return;
    }

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(mynumber, verify)
      .then((result) => {
        setfinal(result);
        alert("code sent");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        // success

        let userName = {
          name: name,
          phone: mynumber,
          avatar: fileUrl,
        };

        let check = true;

        gotUser.forEach((e) => {
          if (e.data.phone == mynumber) {
            alert(`Welcome back ${e.data.name}`);
            check = false;
          }
        });

        if (check) {
          db.collection("users").add(userName);
          alert(`${name}, Welcome`);
        }

        localStorage.setItem("user", JSON.stringify(userName));
        dispatch(userData(userName));
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  // console.log(user);

  return (
    <div className="login">
      {uploads ? (
        <div>
          {" "}
          <h1>Uploading....</h1>
        </div>
      ) : (
        <div className="login__main">
          <div className="logo__login">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"
              alt=""
            />
          </div>

          <div className="login__input">
            <div
              className="send__otp"
              style={{ display: !show ? "flex" : "none" }}
            >
              <p>Enter Phone Number</p>

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Your Name"
              />

              <input
                value={mynumber}
                onChange={(e) => {
                  setnumber(e.target.value);
                }}
                placeholder="+91 phone number"
              />

              {/* <input type="file" onChange={onFileChange} /> */}

              <input
                type="text"
                placeholder="Enter image url"
                onChange={(e) => {
                  setFileUrl(e.target.value);
                }}
              />

              <div className="cap" id="recaptcha-container"></div>
              <button onClick={signin}>Send OTP</button>
            </div>

            {/* verify */}

            <div style={{ display: show ? "flex" : "none" }}>
              <p>Enter OTP</p>
              <input
                type="text"
                placeholder={"Enter your OTP"}
                onChange={(e) => {
                  setotp(e.target.value);
                }}
              ></input>
              <button onClick={ValidateOtp}>Verify</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
