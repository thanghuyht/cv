//*---Nav---
const dropdownNavBtn = document.getElementById('dropdownBtn')
const navLink = document.getElementById('navlink')
const homecontainer = document.getElementById('Home')
dropdownNavBtn.onclick = function () {
    this.classList.toggle('active')
    navLink.classList.toggle('mobileNav')
}
const dropdownLink = document.getElementsByClassName('nav-item')
for (let i = 0; i < dropdownLink.length; i++) {
    const element = dropdownLink[i]
    element.addEventListener("click", function () {
        var current = document.querySelectorAll('.nav__links .active')
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "")
        }
        this.className += " active"
    })
}
//*---end nav---

//*---Form Validator---
function Validator(formSelector) {
    function getParent(element, nameParent) {
        while (element.parentElement) {
            if (element.parentElement.matches(nameParent)) {
                return element.parentElement
            } else {
                element = element.parentElement
            }
        }
    }
    var fomrRules = {}
    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Bạn phải nhập trường này'
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Bạn hãy nhập đúng email'
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Nhập ít nhất ${min} ký tự`
            }
        },
    }
    var formElement = document.querySelector(formSelector)
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|')
            for (var rule of rules) {
                var isRuleHasFun = rule.includes(':')
                var ruleInfor
                if (isRuleHasFun) {
                    ruleInfor = rule.split(':')
                    rule = ruleInfor[0]
                }
                var ruleFcn = validatorRules[rule]
                if (isRuleHasFun) {
                    ruleFcn = ruleFcn(ruleInfor[1])
                }
                if (Array.isArray(fomrRules[input.name])) {
                    fomrRules[input.name].push(ruleFcn)
                } else {
                    fomrRules[input.name] = [ruleFcn]
                }
            }
            input.onblur = handleValidate
            input.oninput = handleClearError
        }
    }
    var errorMessager
    function handleValidate(event) {
        var rules = fomrRules[event.target.name]
        rules.some(function (rule) {
            errorMessager = rule(event.target.value)
            return errorMessager
        })
        if (errorMessager) {
            var formGroup = getParent(event.target, '.form-group')
            formGroup.classList.add('invalidate')
            formGroup.querySelector('.form-message').innerText = errorMessager
        }
    }
    function handleClearError(event) {
        var formGroup = getParent(event.target, '.form-group')
        if (formGroup.classList.contains("invalidate")) {
            formGroup.classList.remove('invalidate')
        }
        if (errorMessager) {
            formGroup.querySelector('.form-message').innerText = ''
        }
    }
}
//*----End form validators----


//*---Scroll handler---
var scrollToTopBtn = document.getElementById("toTopMenu")
window.onscroll = function () {
    console.log(window.scrollY);
    let opsetTopBody = window.scrollY
    if (opsetTopBody >= 400) {
        scrollToTopBtn.style.display = "block"
    } else {
        scrollToTopBtn.style.display = "none"
    }

    /* /? active nav when scroll
    let parrentElements = document.querySelectorAll('.pages')
    let elementsChildrens = parrentElements[0].children
    let current = ''
    const navLiElements = document.querySelectorAll('.nav-item')
    if (elementsChildrens) {
        for (let i = 0; i < elementsChildrens.length; i++) {
            const elementOpsetTop = elementsChildrens[i].offsetTop
            if (opsetTopBody + 10 >= elementOpsetTop) {
                current = elementsChildrens[i].id
                // console.log(elementOpsetTop, opsetTopBody)
            }
        }

    }
    navLiElements.forEach((li) => {
        // console.log(li.dataset.id)
        li.classList.remove("active")
        if (li.dataset.id === current) {
            li.classList.add("active")
        }
    })
    */
}

//*function scroll to top
function scrollToTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}
//*end scroll to top

//*Flat menu */
const flatMenu = document.querySelector('.flatMenu')
function showFlatMenu() {
    if (flatMenu) {
        for (let i = 0; i < flatMenu.children.length; i++) {
            flatMenu.children[i].classList.add('show')
        }
    }
}
function hideFlatmenu() {
    if (flatMenu) {
        for (let i = 0; i < flatMenu.children.length; i++) {
            setTimeout(() => {
                flatMenu.children[i].classList.remove('show')
            }, 3000);
        }
    }
}
//*end Flat menu */