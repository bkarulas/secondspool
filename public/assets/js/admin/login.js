document.getElementById('form').addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
     e.preventDefault();
     document.getElementById("submit").click();
    }
  });



async function adminLogin(){
    let email=document.getElementById('inputemail').value;
    let pword = document.getElementById('inputpassword').value;
    let login = await getAdminLogin(email, pword);
    console.log("login");
    console.log(login[0]);
    let adminId = login[0].admin
    console.log(`Admin ID: ${adminId}`);
    setTimeout((adminId != '')? adminUrl=`/adindex?a=${adminId}`:adminUrl = '/admin?m=error', 5000);
    //(adminId != '')? adminUrl=`/adindex?a=${adminId}`:adminUrl = '/admin?m=error';
    console.log(baseUrl+adminUrl);
    location.replace(baseUrl+adminUrl);
}


async function getAdminLogin(email, pword){
    const res = await fetch("/api/login/admin",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            info:{
                email:email,
                pword:pword
            }
        })
    });
    return res.json();
}
