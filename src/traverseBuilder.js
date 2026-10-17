export function traverseBuilder(path, navigate, options) {
  let delay = 600
  let onDone = null

  if (options) {
    if (options.delay !== undefined) {
      delay = options.delay
    }
    if (options.onDone !== undefined) {
      onDone = options.onDone
    }
  }

  function traverse() {

    const steps = path.slice(1)

    for (let i = 0; i < steps.length; i++) {
      const page = steps[i]
      const isLastStep = i === steps.length - 1

      setTimeout(function () {
        navigate(page)
        if (isLastStep && onDone) {
          onDone()
        }
      }, delay * (i + 1))
    }

    if (steps.length === 0 && onDone) {
      onDone()
    }
  }

  return traverse
}
