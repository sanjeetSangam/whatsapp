import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebase, auth, firebaseApp } from "../../firebase/firebase";
import { userData } from "../../Redux/User_Data/action";
import db from "../../firebase/firebase";
import Cookies from "js-cookie";
import "./login.css";

import { useNavigate } from "react-router-dom";

const Login = () => {
  // Inputs
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [name, setName] = useState("");

  const [gotUser, setGotUser] = useState([]);

  const [fileUrl, setFileUrl] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file).then(() => {
      alert("Your Profile Pic is uploaded");
    });
    setFileUrl(await fileRef.getDownloadURL());
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
    let cokk = Cookies.get("user");

    if (cokk) {
      dispatch(userData(JSON.parse(cokk)));
      navigate("/");

      return;
    } else {
      console.log(false);
    }
  }, []);

  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

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

        Cookies.set("user", JSON.stringify(userName), { expires: 2 });
        dispatch(userData(userName));
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  // console.log(user);

  return (
    <div className="login">
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

            <input type="file" onChange={onFileChange} />

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
    </div>
  );
};

export default Login;
