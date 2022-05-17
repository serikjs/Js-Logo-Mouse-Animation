window.addEventListener('load', () => {
	const brain = document.querySelector('.banner-img'),
		brainWrapper = document.querySelector('.banner__img-container'),
		brainContainer = document.querySelector('.banner-section')

	var calcSkew = function (max, windowWidth, cursorX, cursorY, skewY) {
		// setup
		var halfWidth = windowWidth / 2 // get the half width of the window
		var halfCurrentPos = cursorX - halfWidth // get position of x/y releative to halfWidth
		var percentageDecimal = halfCurrentPos / halfWidth, // turn halfCurrentPos into a percentage decimal
			skewDegree

		if (cursorY < window.innerHeight / 2) return 0

		if (!skewY) {
			// calculations for posX
			if (halfCurrentPos > 0) {
				skewDegree = -Math.abs(Math.floor(percentageDecimal * max)) // flip skewDegree to negetive for pos on right side
			} else {
				skewDegree = Math.abs(Math.floor(percentageDecimal * max)) // calc skewDegree for left side
			}
		} else {
			// calculations for posY
			if (halfCurrentPos > 0) {
				skewDegree = Math.abs(Math.floor(percentageDecimal * max)) // calc skewDegree for right side
			} else {
				skewDegree = -Math.abs(Math.floor(percentageDecimal * max)) // flip skewDegree to negetive for pos on left side
			}
		}
		return skewDegree
	}

	window.addEventListener('mousemove', function (e) {
		// config
		var self = this,
			evnt = e,
			cursorX = evnt.pageX,
			cursorY = evnt.pageY,
			windowWidth = self.innerWidth,
			windowHeight = self.innerHeight,
			posLeftPercetange = (cursorX / windowWidth) * 100, // turn cursorX pos into a percentage
			posTopPercentage = (cursorY / windowHeight) * 100 // turn cursorY pos into a percentage

		var func = function (event) {
			var elem = brainContainer,
				p = elem.getBoundingClientRect()
			if (cursorX >= p.left && cursorX <= p.right && cursorY >= p.top && cursorY <= p.bottom) {
				brain.style.left = posLeftPercetange + '%'
				brain.style.transform =
					'translate(-50%, -50%) skewX(' +
					calcSkew(12, windowWidth, cursorX, cursorY) +
					'deg) skewY(' +
					calcSkew(8, windowWidth, cursorX, cursorY, 'skewY') +
					'deg)'

				brain.style.top = posTopPercentage + '%'
				brain.style.transform =
					'translate(-50%, -50%) skewX(' +
					calcSkew(12, windowWidth, cursorX, cursorY) +
					'deg)  skewY(' +
					calcSkew(8, windowWidth, cursorX, cursorY, 'skewY') +
					'deg)'

				evnt.stopPropagation()
			} else {
				brain.style.left = '50%'
				brain.style.transform = 'translate(-50%, -50%)'

				brain.style.top = '50%'
				brain.style.transform = 'translate(-50%, -50%)'
			}
		}
		func(e)
	})
})
