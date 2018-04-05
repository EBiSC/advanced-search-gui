const duration = 200
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
  display: "none",
  transform: "translateY(120px)"
}
const transitionStyles = {
  entering: { opacity: 0, display: "block" },
  exiting: { opacity: 1, display: "block" },
  exited: { opacity: 0, transform: "translateY(120px)", display: "none" },
  entered: {
    opacity: 1,
    display: "block",
    transform: "translateY(0)"
  }
}
export { duration, defaultStyle, transitionStyles }
