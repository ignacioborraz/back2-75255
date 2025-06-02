document.querySelector("#verify").addEventListener("click", async () => {
  try {
    const email = document.querySelector("#email").value;
    const verifyCode = document.querySelector("#code").value;
    const url = `/api/auth/verify/${email}/${verifyCode}`;
    let response = await fetch(url);
    response = await response.json();
    //console.log(response);
    if (response.error) {
      alert(response.error);
    } else {
      location.replace("/");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});
