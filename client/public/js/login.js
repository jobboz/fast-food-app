const login = e => {
    e.preventDefault();

    const data = {
     username: document.getElementById('username').value,
    password: document.getElementById('password').value
};

const body = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)

};
fetch('https://fast-food-app.herokuapp.com/api/v1/signin', body)
    .then(res => res.json())
    .then(user => {
      console.log("user=======", user);
    })
    .catch(err => console.log(err.message));

}
document.getElementById("signin").addEventListener("submit", signin, false);
