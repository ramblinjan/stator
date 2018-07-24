/**
 * 
 * @param {String} address Address to a deep key in an object
 * @returns {String[]} array of accessors to find a deep property in an object
 */
export const getAccessorArray = (address) => {
  if(typeof address !== 'string') throw new Error('Object address must be a string');
  if(address.length === 0) throw new Error('Object address must not be empty');
  
  const splitByDots = address.split(/\.(?![.]+)/);

  const parseBrackets = splitByDots.map(slice => {

    const bracketsRegex = /([^[]*)\[(?:([0-9]+)|([^\[\]]+))\]/g;
    
    let bracketsPiece;
    let bracketsArray = [];
    // const brackets = bracketsRegex.exec(slice);
    while((bracketsPiece = bracketsRegex.exec(slice)) !== null) {

      if(bracketsPiece[1]) bracketsArray.push(bracketsPiece[1]);

      if(bracketsPiece[2] !== undefined) {
        bracketsArray.push(parseInt(bracketsPiece[2], 10));
      } else if(bracketsPiece[3] !== undefined) {
        bracketsArray.push(bracketsPiece[3]);
      }
    }

    return bracketsArray.length ? bracketsArray : [slice];
  }).reduce((a, b) => [...a, ...b], []);
  
  return parseBrackets;
}

export default getAccessorArray;