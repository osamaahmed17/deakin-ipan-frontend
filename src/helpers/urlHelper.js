export const replacePlaceHolder = (str, values, placeholder='?') => {
  if (!values) return str;
  for(var i = 0; i < values.length; i++) {
    str = str.replace(placeholder, values[i])
  }
  return str;
}
