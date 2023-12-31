const regForm = document.querySelector(".regForm")
const regEmailInput = document.querySelector(".regEmailInput")
const regUsernameInput = document.querySelector(".regUsernameInput")
const regPasswordInput = document.querySelector(".regPasswordInput")
const regConfirmPasswordInput = document.querySelector(".regConfirmPasswordInput")
const errorMessage = document.querySelector(".errorMessage")

const userId = JSON.parse(localStorage.getItem("user"))?.id

// Redirecting to todolist page if logged in
window.onload = () => {
    if (userId) {
        window.location.replace("../pages/todoListPage.html")
    }
}

// Registering a user

const registerUser = async (email, username, password) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email, username, password
        })
    }

    try {
        const response = await fetch("https://65748480b2fbb8f6509c4a34.mockapi.io/api/a/users", options)
        const userData = await response.json()
        if (response.status >= 200 && response.status <= 299) {
            localStorage.setItem("user", JSON.stringify(userData))
            window.location.replace("../pages/todoListPage.html")
        }
    } catch (e) {
        console.log(e)
    }
}

// Submitting the register form

regForm.onsubmit = (e) => {
    e.preventDefault()
    if (regPasswordInput.value === regConfirmPasswordInput.value) {
        registerUser(regEmailInput.value, regUsernameInput.value, regPasswordInput.value).then()
    } else {
        errorMessage.innerHTML = "Passwords is required!"
    }
}

// Remove the error message on type
regPasswordInput.oninput = () => {
    errorMessage.innerHTML = ""
}

// Remove the error message on type
regConfirmPasswordInput.oninput = () => {
    errorMessage.innerHTML = ""
}