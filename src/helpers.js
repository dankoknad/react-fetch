export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const range = (low,hi) => {
  const rangeRec = (low, hi, vals) => {
     if(low > hi) return vals;
     vals.push(low);
     return rangeRec(low+1,hi,vals);
  }
  return rangeRec(low,hi,[]);
}
