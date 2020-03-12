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
    }
}

export default UTILS