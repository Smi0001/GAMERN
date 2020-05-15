const UTILS = {

    scrollToHiddenElementById: (elementId) => {
        var element = document.getElementById(elementId)
        var fn = () => {
            if (element && !element.classList.contains('hidden')) {
                element.scrollIntoView()
                clearInterval(k)
            }
        }
        var k = setInterval(fn, 400)
        setTimeout(() => {
            clearInterval(k)
        }, 5000)
    },

    replaceClassFromElement: (
        querySelector, className, potentialClassList
    ) => {
        const element = document.querySelector(querySelector)
        if (element) {
            potentialClassList.forEach( classItem => {
                if (element.classList.contains(classItem)) { //TODO: condition to exit loop once condition is met
                    element.classList.replace(classItem, className)
                    return false
                }
            });
        }
    },

    bodyClickButNotElementCallback: (elementClass, callback) => {
        document.addEventListener('click', function(event){
            // console.log('clicked', event.target)
            const clickedElementClass = typeof event.target.className === "string" && event.target.className.trim()
            if (clickedElementClass) {
                const passedElement = document.querySelector(`.${clickedElementClass.split(' ').join('.')}`)
                if (passedElement) {
                    // console.log('passsedElement', passedElement)
                    const passedElementAsParent = passedElement.closest(elementClass)
                    if (passedElementAsParent && (
                        passedElementAsParent.classList.contains('nav-menu')
                        || passedElementAsParent.classList.contains(elementClass)
                    )) {
                        // console.log('condition true', passedElementAsParent)
                        return false
                    }
                }
            }
            callback && callback()
        })
    },
    removeBodyClick: () => {
        document.removeEventListener && document.removeEventListener('click')
        // console.log('removed clicked')
    },

}

export default UTILS