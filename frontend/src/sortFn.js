import { firstBy } from "thenby"

export default (sortArgs) => {
	return sortArgs.reduce((sortFn, args, idx) => {
    if (idx === 0) {
      return firstBy(...args)
    } else {
      return sortFn.thenBy(...args)
    }
  }, () => 0)
}
