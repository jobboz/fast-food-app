const token = localStorage.getItem('tokens');
if(token === null) {
    window.location.href = './login.html';

}

    // navbar userdetail 
    const userName = localStorage.getItem('name');
    const userImg = localStorage.getItem('image');
    document.getElementById('nav-name').innerHTML = userName;
    document.getElementById('nav-img').src = userImg;
     //navbar userdetail ends

       const addFoodItem = (e) => 
           e.preventDefault();
           const message = document.getElementById ('success-message');
           const close = document.getElementById('close');
           document.getElementById('loading').style.display = 'block';
           const post = {
               item_name: document.getElementById('item-name').value,
               price: document.getElementById('price').value,
               quantity: document.getElementById('quantity').value
           };
           const option = { 
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'x-access-token': token,
               },
               body: JSON.stringify(post)
           }
       
       fetch('https://fast-food-app.herokuapp.com/api/v1/orders', option)
       .then(res => res.json())
       .then((data) => {
document.getElementById('loading').style.display = '';
    if(data.status === 'Success') {
        message.style.display = 'block';
        document.getElementById('existed-item_name').style.display = '';
    } else if(data.message === 'Authentication failed, Token is either invalid or expired') {
       window.location.href = './login.html';
    }else {
        document.getElementById('exited-item_name').style.display = 'block';
        console.log(data);
    }
       })
       .catch((err) => {
           console.log(err);
         })

close.onclick = function () {
    message.style.display = 'none';
    document.getElementById('item_name').value = '';
    document.getElementById('quantity').value = '';
}
document.getElementById('add-item').addEventListener('submit', addFoodItem, false )