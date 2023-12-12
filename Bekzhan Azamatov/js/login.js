const loginForm = document.querySelector(".loginForm")
const loginEmailInput = document.querySelector(".loginEmailInput")
const loginPasswordInput = document.querySelector(".loginPasswordInput")
const errorMessage = document.querySelector(".errorMessage")

const userId = JSON.parse(localStorage.getItem("user"))?.id

// Redirect to todolist page if logged in
window.onload = () => {
    if (userId) {
        window.location.replace("../pages/todoListPage.html")
    }
}

// Fetch all users to find the right user by the login and password
const fetchAllUsers = async () => {
    try {
        const response = await fetch("https://65748480b2fbb8f6509c4a34.mockapi.io/api/a/users")
        const users = await response.json()
        return users.find(item => item.email === loginEmailInput.value && item.password === loginPasswordInput.value)

    } catch (e) {
        console.log(e)
    }
}

// Submitting the login form

loginForm.onsubmit = async (e) => {
    e.preventDefault()
    const user = await fetchAllUsers()
    if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        window.location.replace("../pages/todoListPage.html")
    } else {
        errorMessage.innerHTML = "Invalid login or password"
    }
}

// Remove the error message on type
loginEmailInput.oninput = () => {
    errorMessage.innerHTML = ""
}

// Remove the error message on type
loginPasswordInput.oninput = () => {
    errorMessage.innerHTML = ""
}