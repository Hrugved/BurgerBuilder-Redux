export const updateObject = (oldObj, newPropsObj) => {
  return {
    ...oldObj,
    ...newPropsObj
  }
}