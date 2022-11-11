//*---Nav---
const dropdownNavBtn = document.getElementById('dropdownBtn')
const navLink = document.getElementById('navlink')
const homecontainer = document.getElementById('Home')
dropdownNavBtn.onclick = function () {
    this.classList.toggle('active')
    navLink.classList.toggle('mobileNav')
}
//*---Scroll handler---
window.onscroll = function () {
    const sections = document.querySelectorAll('section')
    const navItems = document.querySelectorAll('.nav-items')
    var scrollToTopBtn = document.getElementById("toTopMenu")
    //--- show button go to top
    let opsetTopBody = window.scrollY
    opsetTopBody >= 400 ? scrollToTopBtn.style.display = "block" : scrollToTopBtn.style.display = "none"

    //--- action NavLinks
    const sectionPoint = []
    const sectionArea = []
    for (let i = 0; i < sections.length - 1; i++) {
        const element = sections[i + 1];
        sectionPoint.push(element.offsetTop - 52)
        sectionArea.push(element.offsetTop - 52 + element.offsetHeight)
        // -52px Navbar height
    }
    for (let i = 0; i <= navItems.length - 1; i++) {
        const lastSection = sections[sections.length - 1].offsetTop - sections[sections.length - 1].offsetHeight - 52
        if (opsetTopBody >= sectionPoint[i] && opsetTopBody <= sectionArea[i] && opsetTopBody < lastSection) {
            navItems[i].classList.add('active')
        } else if (opsetTopBody > lastSection) {
            navItems[navItems.length - 1].classList.add('active')
            navItems[navItems.length - 2].classList.remove('active')
        } else {
            navItems[i].classList.remove('active')
        }
    }
}
//*---end nav---

//slider image
let slides = document.querySelectorAll('.image-slider')
let sliderMenus = document.querySelectorAll('.slider-menu')
function setShow(indexShow) {
    const clearSlider = () => {
        for (let index = 0; index < slides.length; index++) {
            slides[index].style.display = 'none'
        }
    }
    const clearMenus = () => {
        for (let index = 0; index < sliderMenus.length; index++) {
            sliderMenus[index].classList.remove('active')
        }
    }
    clearSlider()
    clearMenus()
    if (!!indexShow || indexShow === 0) {
        slides[indexShow].style.display = 'flex'
        sliderMenus[indexShow].classList.add('active')
    } else {
        slides[1].style.display = 'flex'
        sliderMenus[1].classList.add('active')
    }
}

setShow()
function showImage(n) {
    setShow(n)
}
//END slider image

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

//*Flat menu */
const flatMenu = document.getElementById('toTopMenu')
let delay
const showFlatMenu = () => {
    flatMenu.classList.add('show')
    clearTimeout(delay)
}
function hideFlatMenu() {
    delay = setTimeout(() => { flatMenu.classList.remove('show') }, 1000)
}
//---scroll to top
function scrollToTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

//*end Flat menu */
