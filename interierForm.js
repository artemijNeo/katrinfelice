const form = document.querySelector(".interierForm")
const fileInput = document.getElementById("interier")
let imgs
let errMsg


const loadingDiv = document.querySelector("#loadingDiv")

const fileInputBtn = document.querySelector(".file_button")


form.addEventListener("submit", formSend)

async function formSend(e) {
    let canContinue = true
    e.preventDefault()

    let error = await formValidate(form)
    
    if (error != 0) {
        alert(errMsg)
    }


    const reader = new FileReader()

    await reader.addEventListener("load", () => {
        imgs = reader.result
        formSender()
    })

    if (fileInput.files[0]) {
        await reader.readAsDataURL(fileInput.files[0])
    }

    async function formSender () {
        loadingDiv.classList.add("active")
        console.log("hello");
        let formData = new FormData(form)
        const data = {
            "name": formData.get("name"),
            "email": formData.get("email"),
            "product": formData.get("product"),
            "interier": imgs
        }
    
        console.log("hello2 " + error);
        if (error === 0) {
            let response = await fetch("http://localhost:5501/sendInterier", {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                mode: "cors"
            })
            console.log("here");
            if (response.ok) {
                console.log(response)
                form.reset()
            } else {
                alert("error")
            }
        }
        loadingDiv.classList.remove("active")
    }
}


async function formValidate(form) {
    errMsg = ""
    let error = 0
    let formReq = document.querySelectorAll("._req")

    for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i]

        if (input.id === "interier") {
            formRemoveError(fileInputBtn)
        } else {
            formRemoveError(input)
        }

        if (input.id === "email") {
            if (emailTest(input)) {
                formAddError(input)
                errMsg = "Неверный email!"
                error++
            } else {
                formRemoveError(input)
            }
        } else if (input.value.trim() === "") {
            if (input.id === "interier") {
                formAddError(fileInputBtn)
            } else {
                formAddError(input)
            }
            errMsg = "Поля не должны быть пустыми!"
            error++
        }
    }
    return error
}

function formAddError(input) {
    input.classList.add("_error")
}

function formRemoveError(input) {
    input.classList.remove("_error")
}


function emailTest(input) {
    return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
}

fileInput.addEventListener("change", () => {
    uploadFile(fileInput.files[0])
})

function uploadFile(file) {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Разрешены только изображения!")
        fileInput.value = ""
        formAddError(fileInputBtn)
        return
    } else if (file.size > 3 * 1024 * 1024) {
        alert("Файл должен быть не более 3 мб!")
        fileInput.value = ""
        formAddError(fileInputBtn)
        return
    }
}