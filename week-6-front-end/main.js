if (window.location.pathname == "/register.html") {
  const registration_form = document.querySelector(".register");
  const txtfullname = document.querySelector("#firstName");
  const txtemail = document.querySelector("#email");
  const txtpassword = document.querySelector("#password");
  const txtpassword2 = document.querySelector("#confirmPassword");
  const reg_notification = document.querySelector("#notifications-reg");
  const cohort = document.querySelector("#cohortNumber");

  let profileurl = "";
  const regError = document.querySelector(".regError");

  registration_form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(txtpassword.value, txtpassword2.value);

    if (txtpassword.value !== txtpassword2.value) {
      reg_notification.textContent = "Your Passwords do not match";
      setTimeout(function () {
        reg_notification.textContent = "";
      }, 3000);
      console.log("pwd don match");
      return;
    }

    console.log(profileurl);
    let user =
      txtfullname.value !== "" &&
      txtemail.value !== "" &&
      txtpassword.value !== "";

    if (user) {
      const promise = new Promise((resolve, reject) => {
        fetch("http://localhost:4500/users/register", {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            full_name: txtfullname.value,
            email: txtemail.value,
            password: txtpassword.value,
            cohort: cohort.value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            window.location.href = "/success.html";
            // regError.innerHTML = data[0]?.message ?? data?.message
            resolve(data);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    }
  });
}
